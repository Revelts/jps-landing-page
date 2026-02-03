import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET: Fetch published blog posts for public display
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    let sql = `
      SELECT 
        id,
        title,
        slug,
        excerpt,
        featured_image,
        TO_CHAR(published_at, 'YYYY-MM-DD') as published_at,
        TO_CHAR(created_at, 'YYYY-MM-DD') as created_at
      FROM blog_posts
      WHERE status = 'published'
        AND published_at IS NOT NULL
      ORDER BY published_at DESC, created_at DESC
    `;
    
    const params: any[] = [];
    
    if (limit) {
      params.push(parseInt(limit, 10));
      sql += ` LIMIT $${params.length}`;
    }

    const result = await query(sql, params);

    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error('❌ [/api/blog] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
