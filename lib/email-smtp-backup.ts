/**
 * Email Service
 * Handle sending emails via SMTP (Nodemailer)
 */
import nodemailer from 'nodemailer';

// Email configuration
const getEmailConfig = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('⚠️  SMTP credentials not configured. Email sending will fail.');
  }

  return {
    host,
    port,
    secure,
    auth: user && pass ? {
      user,
      pass,
    } : undefined,
  };
};

const emailConfig = getEmailConfig();

// Create reusable transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify SMTP connection
export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified');
    return true;
  } catch (error) {
    console.error('❌ SMTP connection failed:', error);
    return false;
  }
}

// Send email utility
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Jakarta Party Squad'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to,
      subject,
      text: text || '',
      html,
    });

    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('❌ Email send failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// Generate verification token
export function generateVerificationToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15) +
         Date.now().toString(36);
}

// Email templates
export const emailTemplates = {
  /**
   * Email Verification Template
   * Premium Cyber-Punk Design
   */
  verification: (name: string, verificationUrl: string) => ({
    subject: '🎊 Verify Your Jakarta Party Squad Account',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - Jakarta Party Squad</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);">
  
  <!-- Main Container -->
  <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        
        <!-- Content Card -->
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: rgba(15, 20, 40, 0.95); border-radius: 20px; border: 1px solid rgba(59, 130, 246, 0.2); box-shadow: 0 20px 60px rgba(59, 130, 246, 0.15), 0 0 40px rgba(139, 92, 246, 0.1); overflow: hidden;">
          
          <!-- Header with Gradient -->
          <tr>
            <td style="padding: 0;">
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); height: 6px;"></div>
            </td>
          </tr>
          
          <!-- Logo Section -->
          <tr>
            <td align="center" style="padding: 40px 40px 20px 40px;">
              <img src="https://jakartapartysquad.com/assets/images/logo_2.png" alt="Jakarta Party Squad" style="width: 80px; height: 80px; border-radius: 16px; box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);">
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td align="center" style="padding: 20px 40px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -0.5px;">
                Welcome to the Squad! 🎊
              </h1>
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td style="padding: 0 40px 20px 40px;">
              <p style="margin: 0; font-size: 18px; color: #e2e8f0; text-align: center; line-height: 1.6;">
                Hi <strong style="color: #60a5fa;">${name}</strong>,
              </p>
            </td>
          </tr>
          
          <!-- Message -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="margin: 0; font-size: 16px; color: #cbd5e1; text-align: center; line-height: 1.8;">
                Thanks for joining <strong style="color: #a78bfa;">Jakarta Party Squad</strong>! 
                We're excited to have you as part of our community. 
                To get started, please verify your email address.
              </p>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 0 40px 40px 40px;">
              <table role="presentation" style="border-collapse: collapse;">
                <tr>
                  <td style="border-radius: 12px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4), 0 0 30px rgba(139, 92, 246, 0.2);">
                    <a href="${verificationUrl}" style="display: inline-block; padding: 16px 48px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">
                      ✨ Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%);"></div>
            </td>
          </tr>
          
          <!-- Alternative Link -->
          <tr>
            <td style="padding: 30px 40px;">
              <p style="margin: 0 0 15px 0; font-size: 14px; color: #94a3b8; text-align: center;">
                If the button doesn't work, copy and paste this link:
              </p>
              <p style="margin: 0; font-size: 13px; color: #60a5fa; text-align: center; word-break: break-all; background: rgba(59, 130, 246, 0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.1);">
                <a href="${verificationUrl}" style="color: #60a5fa; text-decoration: none;">${verificationUrl}</a>
              </p>
            </td>
          </tr>
          
          <!-- Expiry Notice -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="margin: 0; font-size: 13px; color: #94a3b8; text-align: center; line-height: 1.6;">
                ⏰ This link will expire in <strong style="color: #a78bfa;">24 hours</strong>.
              </p>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%);"></div>
            </td>
          </tr>
          
          <!-- Footer Info -->
          <tr>
            <td style="padding: 30px 40px 40px 40px;">
              <p style="margin: 0 0 20px 0; font-size: 13px; color: #94a3b8; text-align: center; line-height: 1.6;">
                Didn't create an account? You can safely ignore this email.
              </p>
              
              <!-- Social Links -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <table role="presentation" style="display: inline-block; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 0 10px;">
                          <a href="https://www.instagram.com/jakartapartysquad" style="color: #60a5fa; text-decoration: none; font-size: 24px;">📸</a>
                        </td>
                        <td style="padding: 0 10px;">
                          <a href="https://www.tiktok.com/@jakarta_party_squad" style="color: #a78bfa; text-decoration: none; font-size: 24px;">🎵</a>
                        </td>
                        <td style="padding: 0 10px;">
                          <a href="https://discord.gg/UshBBJkDS8" style="color: #60a5fa; text-decoration: none; font-size: 24px;">💬</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0 0 0; font-size: 12px; color: #64748b; text-align: center;">
                © 2024 Jakarta Party Squad. All rights reserved.
              </p>
            </td>
          </tr>
          
          <!-- Bottom Gradient -->
          <tr>
            <td style="padding: 0;">
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); height: 4px;"></div>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
    `,
    text: `
Welcome to Jakarta Party Squad, ${name}!

Thanks for joining our community. To get started, please verify your email address by clicking the link below:

${verificationUrl}

This link will expire in 24 hours.

If you didn't create an account, you can safely ignore this email.

---
Jakarta Party Squad
https://jakartapartysquad.com
    `,
  }),

  /**
   * Welcome Email (after verification)
   */
  welcome: (name: string) => ({
    subject: '🎉 Welcome to Jakarta Party Squad!',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome - Jakarta Party Squad</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);">
  
  <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background: rgba(15, 20, 40, 0.95); border-radius: 20px; border: 1px solid rgba(59, 130, 246, 0.2); box-shadow: 0 20px 60px rgba(59, 130, 246, 0.15); overflow: hidden;">
          
          <tr>
            <td style="padding: 0;">
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); height: 6px;"></div>
            </td>
          </tr>
          
          <tr>
            <td align="center" style="padding: 40px 40px 20px 40px;">
              <img src="https://jakartapartysquad.com/assets/images/logo_2.png" alt="Jakarta Party Squad" style="width: 80px; height: 80px; border-radius: 16px; box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);">
            </td>
          </tr>
          
          <tr>
            <td align="center" style="padding: 20px 40px;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                You're All Set! 🎉
              </h1>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 20px 40px 40px 40px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #e2e8f0; text-align: center; line-height: 1.8;">
                Hey <strong style="color: #60a5fa;">${name}</strong>,
              </p>
              <p style="margin: 0; font-size: 16px; color: #cbd5e1; text-align: center; line-height: 1.8;">
                Your email has been verified! Welcome to the <strong style="color: #a78bfa;">Jakarta Party Squad</strong> community. 
                Get ready to explore Jakarta's nightlife, join exclusive events, and connect with party enthusiasts!
              </p>
            </td>
          </tr>
          
          <tr>
            <td align="center" style="padding: 0 40px 40px 40px;">
              <table role="presentation" style="border-collapse: collapse;">
                <tr>
                  <td style="border-radius: 12px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);">
                    <a href="https://jakartapartysquad.com" style="display: inline-block; padding: 16px 48px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">
                      🚀 Explore Now
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <p style="margin: 0; font-size: 12px; color: #64748b; text-align: center;">
                © 2024 Jakarta Party Squad. All rights reserved.
              </p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 0;">
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); height: 4px;"></div>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
    `,
    text: `Welcome, ${name}! Your email has been verified. Explore Jakarta's nightlife at https://jakartapartysquad.com`,
  }),
};
