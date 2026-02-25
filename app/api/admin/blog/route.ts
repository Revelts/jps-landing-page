import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth-middleware';
import { query } from '@/lib/db';

// GET: Fetch all blog posts (Admin only)
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateUser();
    
    if (!auth.success || !auth.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Admin only
    if (auth.user.role !== 'Admin') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Admin only.' },
        { status: 403 }
      );
    }

    // Get query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let sql = `
      SELECT 
        bp.*,
        u.name as author_name,
        u.email as author_email
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (status) {
      params.push(status);
      sql += ` AND bp.status = $${params.length}`;
    }
    
    sql += ` ORDER BY bp.created_at DESC`;

    const result = await query(sql, params);

    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST: Create new blog post (Admin only)
export async function POST(request: NextRequest) {
  console.log('📝 [API] POST /api/admin/blog - Request received');
  
  try {
    console.log('🔐 [API] Authenticating user...');
    const auth = await authenticateUser();
    
    if (!auth.success || !auth.user) {
      console.error('❌ [API] Authentication failed');
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('✅ [API] User authenticated:', { id: auth.user.id, name: auth.user.name, role: auth.user.role });

    // Admin only
    if (auth.user.role !== 'Admin') {
      console.error('❌ [API] Access denied - not admin');
      return NextResponse.json(
        { success: false, message: 'Access denied. Admin only.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, slug, content, excerpt, featured_image, status } = body;

    console.log('📦 [API] Request body received:', { 
      title: title?.slice(0, 30), 
      slug, 
      contentLength: content?.length,
      excerpt: excerpt?.slice(0, 30),
      featured_image: featured_image?.slice(0, 50),
      status 
    });

    // Validate input
    if (!title || !slug || !content) {
      console.error('❌ [API] Validation failed - missing required fields', { 
        hasTitle: !!title, 
        hasSlug: !!slug, 
        hasContent: !!content 
      });
      return NextResponse.json(
        { success: false, message: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    console.log('🔍 [API] Checking if slug exists...');
    // Check if slug already exists
    const checkSlug = await query(
      'SELECT id FROM blog_posts WHERE slug = $1',
      [slug]
    );

    if (checkSlug.rows.length > 0) {
      console.error('❌ [API] Slug already exists:', slug);
      return NextResponse.json(
        { success: false, message: 'Slug already exists. Please use a unique slug.' },
        { status: 400 }
      );
    }

    console.log('✅ [API] Slug is unique, inserting blog post...');
    
    // Insert blog post
    const sql = `
      INSERT INTO blog_posts (
        title,
        slug,
        content,
        excerpt,
        featured_image,
        status,
        published_at,
        author_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const publishedAt = status === 'published' ? new Date() : null;

    const params = [
      title,
      slug,
      content,
      excerpt || null,
      featured_image || null,
      status || 'draft',
      publishedAt,
      auth.user.id,
    ];

    console.log('💾 [API] Executing INSERT query...');
    const result = await query(sql, params);

    console.log('✅ [API] Blog post created successfully:', { id: result.rows[0].id });
    
    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('❌ [API] Create blog post error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

// PUT: Update blog post (Admin only)
export async function PUT(request: NextRequest) {
  try {
    const auth = await authenticateUser();
    
    if (!auth.success || !auth.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Admin only
    if (auth.user.role !== 'Admin') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Admin only.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, title, slug, content, excerpt, featured_image, status } = body;

    // Validate input
    if (!id || !title || !slug || !content) {
      return NextResponse.json(
        { success: false, message: 'ID, title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists (excluding current post)
    const checkSlug = await query(
      'SELECT id FROM blog_posts WHERE slug = $1 AND id != $2',
      [slug, id]
    );

    if (checkSlug.rows.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Slug already exists. Please use a unique slug.' },
        { status: 400 }
      );
    }

    // Get current post to check if status changed to published
    const currentPost = await query(
      'SELECT status, published_at FROM blog_posts WHERE id = $1',
      [id]
    );

    if (currentPost.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Set published_at if status changed to published
    let publishedAt = currentPost.rows[0].published_at;
    if (status === 'published' && currentPost.rows[0].status !== 'published') {
      publishedAt = new Date();
    }

    // Update blog post
    const sql = `
      UPDATE blog_posts SET
        title = $1,
        slug = $2,
        content = $3,
        excerpt = $4,
        featured_image = $5,
        status = $6,
        published_at = $7
      WHERE id = $8
      RETURNING *
    `;

    const params = [
      title,
      slug,
      content,
      excerpt || null,
      featured_image || null,
      status || 'draft',
      publishedAt,
      id,
    ];

    const result = await query(sql, params);

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE: Delete blog post (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const auth = await authenticateUser();
    
    if (!auth.success || !auth.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Admin only
    if (auth.user.role !== 'Admin') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Admin only.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Blog post ID is required' },
        { status: 400 }
      );
    }

    const sql = 'DELETE FROM blog_posts WHERE id = $1 RETURNING *';
    const result = await query(sql, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
