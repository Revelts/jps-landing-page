/**
 * Blacklist Stats API
 * Get statistics about blacklist entries
 */

import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-middleware';

// Force dynamic rendering (uses cookies for auth)
export const dynamic = 'force-dynamic';

/**
 * GET /api/blacklist/stats
 * Get blacklist statistics
 */
export async function GET() {
  try {
    // Require authentication
    await requireAuth();

    const stats = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(phone) as with_phone,
        COUNT(instagram) as with_instagram,
        COUNT(CASE WHEN phone IS NOT NULL AND instagram IS NOT NULL THEN 1 END) as with_both
      FROM blacklist
    `;

    return NextResponse.json({
      success: true,
      data: {
        total: parseInt(stats[0]?.total || '0'),
        withPhone: parseInt(stats[0]?.with_phone || '0'),
        withInstagram: parseInt(stats[0]?.with_instagram || '0'),
        withBoth: parseInt(stats[0]?.with_both || '0'),
      },
    });
  } catch (error: any) {
    console.error('GET /api/blacklist/stats error:', error);

    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch blacklist statistics' },
      { status: 500 }
    );
  }
}
