/**
 * Email Service - SendGrid API
 * Using @sendgrid/mail library (better than SMTP)
 */
import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';

// Configure SendGrid API Key
const initializeSendGrid = () => {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey) {
    console.warn('⚠️  SENDGRID_API_KEY not configured. Email sending will fail.');
    return false;
  }
  
  sgMail.setApiKey(apiKey);
  return true;
};

// Initialize on import
const isInitialized = initializeSendGrid();

// Optional: Set data residency for EU (uncomment if needed)
// sgMail.setDataResidency('eu');

// Get logo as base64
function getLogoBase64(): string {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'logo_2.png');
    const logoBuffer = fs.readFileSync(logoPath);
    return logoBuffer.toString('base64');
  } catch (error) {
    console.warn('⚠️  Could not read logo file, using fallback');
    return '';
  }
}

// Send email utility
export async function sendEmail({
  to,
  subject,
  html,
  text,
  withLogo = false,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  withLogo?: boolean;
}) {
  try {
    const fromEmail = process.env.SMTP_FROM_EMAIL || 'noreply@jakartapartysquad.com';
    const fromName = process.env.SMTP_FROM_NAME || 'Jakarta Party Squad';

    const msg: any = {
      to,
      from: {
        email: fromEmail,
        name: fromName,
      },
      subject,
      text: text || '',
      html,
    };

    // Attach logo if requested
    if (withLogo) {
      try {
        const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'logo_2.png');
        const logoBuffer = fs.readFileSync(logoPath);
        
        msg.attachments = [
          {
            content: logoBuffer.toString('base64'),
            filename: 'logo.png',
            type: 'image/png',
            disposition: 'inline',
            content_id: 'logo',
          },
        ];
      } catch (error) {
        console.warn('⚠️  Could not attach logo, email will use fallback');
      }
    }

    const response = await sgMail.send(msg);
    
    console.log('✅ Email sent successfully');
    console.log('   To:', to);
    console.log('   Subject:', subject);
    console.log('   Status:', response[0].statusCode);

    return { success: true, messageId: response[0].headers['x-message-id'] };
  } catch (error: any) {
    console.error('❌ Email send failed:', error);
    
    if (error.response) {
      console.error('   Status:', error.response.statusCode);
      console.error('   Body:', error.response.body);
    }
    
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// Verify SendGrid API connection
export async function verifyEmailConnection() {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;
    
    if (!apiKey) {
      console.error('❌ SENDGRID_API_KEY is not set');
      return false;
    }
    
    // Re-initialize if needed
    if (!isInitialized) {
      sgMail.setApiKey(apiKey);
    }
    
    console.log('✅ SendGrid API key is configured');
    return true;
  } catch (error) {
    console.error('❌ SendGrid verification failed:', error);
    return false;
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
  verification: (name: string, verificationUrl: string) => {
    const logoBase64 = getLogoBase64();
    return {
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
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td align="center" style="padding: 15px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 24px; box-shadow: 0 10px 40px rgba(59, 130, 246, 0.5), 0 0 50px rgba(139, 92, 246, 0.4);">
                    ${logoBase64 ? `<img src="data:image/png;base64,${logoBase64}" alt="Jakarta Party Squad" width="100" height="100" style="display: block; border: none; border-radius: 12px;" />` : `<div style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; font-size: 42px; font-weight: 900; color: #ffffff; text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);">JPS</div>`}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Brand Name -->
          <tr>
            <td align="center" style="padding: 20px 40px 15px 40px;">
              <div style="font-size: 22px; font-weight: 700; color: #60a5fa; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 0 25px rgba(96, 165, 250, 0.6);">
                JAKARTA PARTY SQUAD
              </div>
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td align="center" style="padding: 10px 40px 25px 40px;">
              <h1 style="margin: 0; font-size: 38px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; text-shadow: 0 0 35px rgba(139, 92, 246, 0.7), 0 5px 25px rgba(59, 130, 246, 0.5); line-height: 1.2;">
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
    };
  },

  /**
   * Welcome Email (after verification)
   */
  welcome: (name: string) => {
    const logoBase64 = getLogoBase64();
    return {
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
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td align="center" style="padding: 15px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 24px; box-shadow: 0 10px 40px rgba(59, 130, 246, 0.5), 0 0 50px rgba(139, 92, 246, 0.4);">
                    ${logoBase64 ? `<img src="data:image/png;base64,${logoBase64}" alt="Jakarta Party Squad" width="100" height="100" style="display: block; border: none; border-radius: 12px;" />` : `<div style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; font-size: 42px; font-weight: 900; color: #ffffff; text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);">JPS</div>`}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td align="center" style="padding: 20px 40px 15px 40px;">
              <div style="font-size: 22px; font-weight: 700; color: #60a5fa; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 0 25px rgba(96, 165, 250, 0.6);">
                JAKARTA PARTY SQUAD
              </div>
            </td>
          </tr>
          
          <tr>
            <td align="center" style="padding: 10px 40px 25px 40px;">
              <h1 style="margin: 0; font-size: 38px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; text-shadow: 0 0 35px rgba(139, 92, 246, 0.7), 0 5px 25px rgba(59, 130, 246, 0.5); line-height: 1.2;">
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
    };
  },
};
