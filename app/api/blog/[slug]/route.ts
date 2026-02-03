import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET: Fetch single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const sql = `
      SELECT 
        bp.id,
        bp.title,
        bp.slug,
        bp.content,
        bp.excerpt,
        bp.featured_image,
        TO_CHAR(bp.published_at, 'YYYY-MM-DD') as published_at,
        TO_CHAR(bp.created_at, 'YYYY-MM-DD') as created_at,
        u.name as author_name
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE bp.slug = $1
        AND bp.status = 'published'
        AND bp.published_at IS NOT NULL
    `;

    const result = await query(sql, [slug]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Get blog post error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
