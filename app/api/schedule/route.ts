import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// GET: Fetch schedule events for public display
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let sql = `
      SELECT 
        id,
        TO_CHAR(event_date, 'YYYY-MM-DD') as event_date,
        venue_name,
        venue_address,
        artist_dj,
        genres,
        created_at
      FROM weekly_schedule
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (startDate) {
      params.push(startDate);
      sql += ` AND event_date >= $${params.length}`;
    }
    
    if (endDate) {
      params.push(endDate);
      sql += ` AND event_date <= $${params.length}`;
    }
    
    sql += ` ORDER BY event_date ASC, venue_name ASC`;

    const result = await query(sql, params);

    // Transform data for frontend
    const events = result.rows.map((row: any) => ({
      id: row.id,
      date: row.event_date, // Already formatted as YYYY-MM-DD by SQL
      venue: row.venue_name,
      address: row.venue_address,
      dj: row.artist_dj,
      genres: row.genres || [],
      createdAt: row.created_at,
    }));

    return NextResponse.json({
      success: true,
      data: events,
      count: events.length,
    });
  } catch (error) {
    console.error('Get schedule error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch schedule' },
      { status: 500 }
    );
  }
}
