import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

/**
 * API Route for blog detail
 * Uses cache headers for ISR-like behavior
 */
export const dynamic = 'force-dynamic';

// GET: Fetch single blog post by slug with full metadata for SEO
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Note: category and tags columns added in migration 007
    // If migration not run yet, query will work without them
    const sql = `
      SELECT 
        bp.id,
        bp.title,
        bp.slug,
        bp.content,
        bp.excerpt,
        bp.featured_image,
        bp.author_id,
        COALESCE(u.name, 'Jakarta Party Squad') as author_name,
        TO_CHAR(bp.published_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as published_at,
        TO_CHAR(bp.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at,
        TO_CHAR(bp.created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
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

    return NextResponse.json(
      {
        success: true,
        data: result.rows[0],
      },
      {
        headers: {
          // Add cache headers for ISR
          'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('❌ [/api/blog/[slug]] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
