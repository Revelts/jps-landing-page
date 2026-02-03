/**
 * Register API Route
 * POST /api/auth/register
 */
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword, isValidEmail, isValidPassword } from '@/lib/auth';
import { sendEmail, emailTemplates, generateVerificationToken } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, dan nama harus diisi' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24); // 24 hours

    // Create user with verification token
    const result = await query(
      `INSERT INTO users (email, password, name, role, email_verified, verification_token, verification_token_expires) 
       VALUES ($1, $2, $3, $4, FALSE, $5, $6) 
       RETURNING id, email, name`,
      [email.toLowerCase(), hashedPassword, name, 'user', verificationToken, verificationExpires]
    );

    const user = result.rows[0];

    // Send verification email
    try {
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
        message: 'Registrasi berhasil! Cek email Anda untuk verifikasi akun.',
        requiresVerification: true,
      });

    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      
      // Delete the user if email fails to send
      await query('DELETE FROM users WHERE id = $1', [user.id]);

      return NextResponse.json(
        { error: 'Gagal mengirim email verifikasi. Silakan coba lagi atau hubungi admin.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat registrasi' },
      { status: 500 }
    );
  }
}
