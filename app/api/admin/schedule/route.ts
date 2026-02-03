import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth-middleware';
import { query } from '@/lib/db';

// GET: Fetch all schedule events (with optional date filter)
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
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let sql = `
      SELECT 
        ws.*,
        u.name as created_by_name,
        u.email as created_by_email
      FROM weekly_schedule ws
      LEFT JOIN users u ON ws.created_by = u.id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (startDate) {
      params.push(startDate);
      sql += ` AND ws.event_date >= $${params.length}`;
    }
    
    if (endDate) {
      params.push(endDate);
      sql += ` AND ws.event_date <= $${params.length}`;
    }
    
    sql += ` ORDER BY ws.event_date ASC, ws.venue_name ASC`;

    const result = await query(sql, params);

    return NextResponse.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error('Get schedule error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch schedule' },
      { status: 500 }
    );
  }
}

// POST: Create new schedule event(s)
export async function POST(request: NextRequest) {
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
    const { events } = body;

    // Validate input
    if (!events || !Array.isArray(events) || events.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Events array is required' },
        { status: 400 }
      );
    }

    // Validate each event
    for (const event of events) {
      if (!event.event_date || !event.venue_name || !event.artist_dj || !event.venue_address) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Each event must have event_date, venue_name, artist_dj, and venue_address' 
          },
          { status: 400 }
        );
      }

      // Validate date is not in the past
      const eventDate = new Date(event.event_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (eventDate < today) {
        return NextResponse.json(
          { success: false, message: 'Event date cannot be in the past' },
          { status: 400 }
        );
      }
    }

    // Insert events
    const insertedEvents = [];
    
    for (const event of events) {
      const sql = `
        INSERT INTO weekly_schedule (
          event_date,
          venue_name,
          venue_address,
          artist_dj,
          genres,
          created_by
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;

      const params = [
        event.event_date,
        event.venue_name,
        event.venue_address,
        event.artist_dj,
        event.genres || [],
        auth.user.id,
      ];

      const result = await query(sql, params);
      insertedEvents.push(result.rows[0]);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${insertedEvents.length} event(s)`,
      data: insertedEvents,
    });
  } catch (error) {
    console.error('Create schedule error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create schedule events' },
      { status: 500 }
    );
  }
}

// DELETE: Delete schedule event
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
        { success: false, message: 'Event ID is required' },
        { status: 400 }
      );
    }

    const sql = 'DELETE FROM weekly_schedule WHERE id = $1 RETURNING *';
    const result = await query(sql, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Delete schedule error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
