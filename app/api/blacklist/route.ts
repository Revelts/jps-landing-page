/**
 * Blacklist API - GET & POST
 * Protected endpoints for managing blacklist entries
 */

import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth, authenticateUser } from '@/lib/auth-middleware';

// Force dynamic rendering (uses cookies for auth)
export const dynamic = 'force-dynamic';

/**
 * Helper function to censor sensitive data
 * Admin: See full data
 * Public Relation & Member: Last 4 characters censored with xxxx
 */
function censorData(data: string | null, userRole: string): string | null {
  if (!data) return null;
  if (userRole === 'Admin') return data;
  
  // Censor last 4 characters for non-admin users
  if (data.length <= 4) {
    return 'xxxx';
  }
  return data.slice(0, -4) + 'xxxx';
}

/**
 * Apply censorship to blacklist entries based on user role
 */
function censorBlacklistEntries(entries: any[], userRole: string) {
  if (userRole === 'Admin') return entries;
  
  return entries.map(entry => ({
    ...entry,
    phone: censorData(entry.phone, userRole),
    instagram: censorData(entry.instagram, userRole),
  }));
}

/**
 * GET /api/blacklist
 * Get all blacklist entries with optional search
 * Data censorship based on user role (Admin sees all, others see censored)
 */
export async function GET(request: Request) {
  try {
    // Require authentication and get user info
    const auth = await authenticateUser();
    if (!auth.success || !auth.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userRole = auth.user.role || 'Member';

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    let result;
    let countResult;

    if (search) {
      // Search by name, phone, or instagram
      const searchPattern = `%${search}%`;
      result = await sql`
        SELECT 
          id, name, phone, instagram, reason, 
          created_at, updated_at, created_by, updated_by
        FROM blacklist
        WHERE 
          name ILIKE ${searchPattern}
          OR phone ILIKE ${searchPattern}
          OR instagram ILIKE ${searchPattern}
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;

      countResult = await sql`
        SELECT COUNT(*) as total
        FROM blacklist
        WHERE 
          name ILIKE ${searchPattern}
          OR phone ILIKE ${searchPattern}
          OR instagram ILIKE ${searchPattern}
      `;
    } else {
      // Get all entries
      result = await sql`
        SELECT 
          id, name, phone, instagram, reason,
          created_at, updated_at, created_by, updated_by
        FROM blacklist
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;

      countResult = await sql`
        SELECT COUNT(*) as total FROM blacklist
      `;
    }

    const total = parseInt(countResult[0]?.total || '0');
    const totalPages = Math.ceil(total / limit);

    // Apply censorship based on user role
    const censoredData = censorBlacklistEntries(result, userRole);

    return NextResponse.json({
      success: true,
      data: censoredData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      userRole, // Include user role for frontend reference
    });
  } catch (error: any) {
    console.error('GET /api/blacklist error:', error);

    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch blacklist entries' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blacklist
 * Create new blacklist entry
 */
export async function POST(request: Request) {
  try {
    // Require authentication
    const user = await requireAuth();

    const body = await request.json();
    const { name, phone, instagram, reason } = body;

    // Validation
    if (!reason || reason.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Reason is required' },
        { status: 400 }
      );
    }

    if (!phone && !instagram) {
      return NextResponse.json(
        { success: false, error: 'At least phone or instagram is required' },
        { status: 400 }
      );
    }

    // Check if entry already exists
    if (phone) {
      const existing = await sql`
        SELECT id FROM blacklist WHERE phone = ${phone}
      `;

      if (existing.length > 0) {
        return NextResponse.json(
          { success: false, error: 'Phone number already blacklisted' },
          { status: 409 }
        );
      }
    }

    // Insert new entry
    const result = await sql`
      INSERT INTO blacklist (name, phone, instagram, reason, created_by, updated_by)
      VALUES (
        ${name || null},
        ${phone || null},
        ${instagram || null},
        ${reason},
        ${user.id},
        ${user.id}
      )
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0],
      message: 'Blacklist entry created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/blacklist error:', error);

    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create blacklist entry' },
      { status: 500 }
    );
  }
}
