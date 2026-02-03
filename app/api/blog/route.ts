import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

/**
 * API Route must be dynamic because it uses searchParams
 * But we add cache headers for ISR behavior
 */
export const dynamic = 'force-dynamic';

// GET: Fetch published blog posts for public display
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    // Note: category and tags columns added in migration 007
    // Query will gracefully handle if columns don't exist yet
    let sql = `
      SELECT 
        bp.id,
        bp.title,
        bp.slug,
        bp.excerpt,
        bp.featured_image,
        COALESCE(u.name, 'Jakarta Party Squad') as author_name,
        TO_CHAR(bp.published_at, 'YYYY-MM-DD') as published_at,
        TO_CHAR(bp.updated_at, 'YYYY-MM-DD') as updated_at,
        TO_CHAR(bp.created_at, 'YYYY-MM-DD') as created_at
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE bp.status = 'published'
        AND bp.published_at IS NOT NULL
      ORDER BY bp.published_at DESC, bp.created_at DESC
    `;
    
    const params: any[] = [];
    
    if (limit) {
      params.push(parseInt(limit, 10));
      sql += ` LIMIT $${params.length}`;
    }

    const result = await query(sql, params);

    return NextResponse.json(
      {
        success: true,
        data: result.rows,
        count: result.rows.length,
      },
      {
        headers: {
          // Add cache headers for ISR
          'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('❌ [/api/blog] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
