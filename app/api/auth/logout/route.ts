/**
 * Logout API Route
 * POST /api/auth/logout
 */
import { NextRequest, NextResponse } from 'next/server';

// Mark as dynamic route (uses cookies)
export const dynamic = 'force-dynamic';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (token) {
      // Verify token
      const decoded = verifyToken(token);
      
      if (decoded) {
        // Delete session from database
        await query('DELETE FROM sessions WHERE token = $1', [token]);
      }
    }

    // Clear cookie
    const response = NextResponse.json({ success: true });
    response.cookies.delete('auth_token');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat logout' },
      { status: 500 }
    );
  }
}
