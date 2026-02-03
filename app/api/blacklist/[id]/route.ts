/**
 * Blacklist API - GET by ID, PUT, DELETE
 * Protected endpoints for managing individual blacklist entries
 */

import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-middleware';

// Force dynamic rendering (uses cookies for auth)
export const dynamic = 'force-dynamic';

/**
 * GET /api/blacklist/[id]
 * Get single blacklist entry by ID
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require authentication
    await requireAuth();

    const { id } = await params;

    const result = await sql`
      SELECT 
        id, name, phone, instagram, reason,
        created_at, updated_at, created_by, updated_by
      FROM blacklist
      WHERE id = ${parseInt(id)}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Blacklist entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error: any) {
    console.error('GET /api/blacklist/[id] error:', error);

    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch blacklist entry' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/blacklist/[id]
 * Update blacklist entry
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require authentication
    const user = await requireAuth();

    const { id } = await params;
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

    // Check if entry exists
    const existing = await sql`
      SELECT id FROM blacklist WHERE id = ${parseInt(id)}
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Blacklist entry not found' },
        { status: 404 }
      );
    }

    // Check for duplicate phone (excluding current entry)
    if (phone) {
      const duplicate = await sql`
        SELECT id FROM blacklist 
        WHERE phone = ${phone} AND id != ${parseInt(id)}
      `;

      if (duplicate.length > 0) {
        return NextResponse.json(
          { success: false, error: 'Phone number already blacklisted' },
          { status: 409 }
        );
      }
    }

    // Update entry
    const result = await sql`
      UPDATE blacklist
      SET 
        name = ${name || null},
        phone = ${phone || null},
        instagram = ${instagram || null},
        reason = ${reason},
        updated_by = ${user.id},
        updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0],
      message: 'Blacklist entry updated successfully',
    });
  } catch (error: any) {
    console.error('PUT /api/blacklist/[id] error:', error);

    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update blacklist entry' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/blacklist/[id]
 * Delete blacklist entry
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require authentication
    await requireAuth();

    const { id } = await params;

    // Check if entry exists
    const existing = await sql`
      SELECT id FROM blacklist WHERE id = ${parseInt(id)}
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Blacklist entry not found' },
        { status: 404 }
      );
    }

    // Delete entry
    await sql`
      DELETE FROM blacklist WHERE id = ${parseInt(id)}
    `;

    return NextResponse.json({
      success: true,
      message: 'Blacklist entry deleted successfully',
    });
  } catch (error: any) {
    console.error('DELETE /api/blacklist/[id] error:', error);

    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to delete blacklist entry' },
      { status: 500 }
    );
  }
}
