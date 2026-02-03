/**
 * Email Verification API Route
 * GET /api/auth/verify-email?token=xxx
 */
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendEmail, emailTemplates } from '@/lib/email';

// Mark as dynamic route (uses searchParams)
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token verifikasi tidak ditemukan' },
        { status: 400 }
      );
    }

    // Find user with this verification token
    const result = await query(
      `SELECT id, email, name, verification_token_expires 
       FROM users 
       WHERE verification_token = $1 
       AND email_verified = FALSE`,
      [token]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Token verifikasi tidak valid atau sudah digunakan' },
        { status: 400 }
      );
    }

    const user = result.rows[0];

    // Check if token expired
    const now = new Date();
    const expiresAt = new Date(user.verification_token_expires);

    if (now > expiresAt) {
      return NextResponse.json(
        { error: 'Token verifikasi sudah kadaluarsa. Silakan minta token baru.' },
        { status: 400 }
      );
    }

    // Verify the email
    await query(
      `UPDATE users 
       SET email_verified = TRUE, 
           verification_token = NULL, 
           verification_token_expires = NULL,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [user.id]
    );

    // Send welcome email
    try {
      const welcomeEmail = emailTemplates.welcome(user.name);
      await sendEmail({
        to: user.email,
        subject: welcomeEmail.subject,
        html: welcomeEmail.html,
        text: welcomeEmail.text,
        withLogo: true,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail verification if welcome email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Email berhasil diverifikasi! Silakan login.',
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat verifikasi email' },
      { status: 500 }
    );
  }
}
