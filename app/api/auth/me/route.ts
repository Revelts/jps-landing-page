/**
 * Get Current User API Route
 * GET /api/auth/me
 */
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// Mark as dynamic route (uses cookies)
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Tidak terautentikasi' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Token tidak valid' },
        { status: 401 }
      );
    }

    // Check if session exists and not expired
    const sessionResult = await query(
      'SELECT user_id, expires_at FROM sessions WHERE token = $1',
      [token]
    );

    if (sessionResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Sesi tidak ditemukan' },
        { status: 401 }
      );
    }

    const session = sessionResult.rows[0];

    // Check if session expired
    if (new Date(session.expires_at) < new Date()) {
      // Delete expired session
      await query('DELETE FROM sessions WHERE token = $1', [token]);
      return NextResponse.json(
        { error: 'Sesi telah berakhir' },
        { status: 401 }
      );
    }

    // Get user data
    const userResult = await query(
      'SELECT id, email, name, role FROM users WHERE id = $1',
      [session.user_id]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    const user = userResult.rows[0];

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
