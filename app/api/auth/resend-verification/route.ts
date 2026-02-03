/**
 * Resend Verification Email API Route
 * POST /api/auth/resend-verification
 */
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendEmail, emailTemplates, generateVerificationToken } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email harus diisi' },
        { status: 400 }
      );
    }

    // Find user
    const result = await query(
      'SELECT id, email, name, email_verified FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        success: true,
        message: 'Jika email terdaftar, link verifikasi akan dikirim.',
      });
    }

    const user = result.rows[0];

    // Check if already verified
    if (user.email_verified) {
      return NextResponse.json(
        { error: 'Email sudah terverifikasi' },
        { status: 400 }
      );
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours

    // Update user with new token
    await query(
      `UPDATE users 
       SET verification_token = $1, 
           verification_token_expires = $2,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3`,
      [verificationToken, expiresAt, user.id]
    );

    // Send verification email
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;

    const emailContent = emailTemplates.verification(user.name, verificationUrl);

    await sendEmail({
      to: user.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      withLogo: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Email verifikasi berhasil dikirim ulang. Cek inbox Anda.',
    });

  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengirim email' },
      { status: 500 }
    );
  }
}
