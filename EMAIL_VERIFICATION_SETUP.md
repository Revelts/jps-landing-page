# 📧 Email Verification System - Complete Guide

## ✅ What's Been Implemented

Complete email verification system with premium cyber-punk designed emails:

- 📧 **SMTP Email Sending** via Nodemailer
- ✉️ **Beautiful Email Templates** (Verification & Welcome)
- 🔐 **Secure Token Generation** (24-hour expiry)
- 🔄 **Resend Verification** functionality
- ✅ **Email Verification Page** with status feedback
- 🚫 **Login Protection** (requires verified email)

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Add SMTP Configuration to `.env.local`

```env
# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email sender info
SMTP_FROM_NAME=Jakarta Party Squad
SMTP_FROM_EMAIL=noreply@jakartapartysquad.com

# Site URL (for verification links)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

### Step 2: Database Migration (Already Done ✅)

The migration has been run, adding:

- `email_verified` (BOOLEAN) - Verification status
- `verification_token` (VARCHAR) - Unique token
- `verification_token_expires` (TIMESTAMP) - Token expiry
- Indexes for performance

---

### Step 3: Configure Your SMTP Provider

#### Option 1: Gmail (Recommended for Testing)

1. Go to your Google Account → Security
2. Enable 2-Step Verification
3. Generate an App Password:
   - Search for "App Passwords"
   - Select "Mail" and your device
   - Copy the 16-character password

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
```

#### Option 2: SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

#### Option 3: Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
```

#### Option 4: AWS SES

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

---

### Step 4: Test Email Sending

```bash
# Start dev server
npm run dev
```

Then test registration:

1. Go to http://localhost:3000
2. Click **"Login"** button
3. Click **"Daftar sekarang"**
4. Fill in registration form
5. Submit → **Email sent!** ✅

---

### Step 5: Check Your Inbox

You'll receive a beautiful email with:

- 🎊 Welcome message
- ✨ Verify button (primary CTA)
- 🔗 Backup verification link
- ⏰ 24-hour expiry notice
- 📱 Social media links

---

## 📁 Files Created

### 1. **`lib/email.ts`** - Email Service

**Functions:**

- `sendEmail()` - Send emails via SMTP
- `verifyEmailConnection()` - Test SMTP config
- `generateVerificationToken()` - Create unique tokens
- `emailTemplates.verification()` - Verification email HTML
- `emailTemplates.welcome()` - Welcome email HTML

**Usage:**

```typescript
import { sendEmail, emailTemplates } from '@/lib/email';

const email = emailTemplates.verification(userName, verificationUrl);
await sendEmail({
  to: 'user@example.com',
  subject: email.subject,
  html: email.html,
  text: email.text,
});
```

---

### 2. **API Routes**

#### `/api/auth/register` (Updated)

- Creates user with `email_verified = FALSE`
- Generates verification token (24h expiry)
- Sends verification email
- Returns success message (no auto-login)

#### `/api/auth/login` (Updated)

- Checks if email is verified
- Returns error if not verified
- Provides option to resend verification

#### `/api/auth/verify-email` (New)

- **GET** `/api/auth/verify-email?token=xxx`
- Validates token and expiry
- Marks email as verified
- Sends welcome email
- Clears verification token

#### `/api/auth/resend-verification` (New)

- **POST** `/api/auth/resend-verification`
- Generates new token
- Sends new verification email
- Updates expiry to +24 hours

---

### 3. **UI Components**

#### `/app/verify-email/page.tsx` (New)

- Verification landing page
- Shows loading → success/error states
- Auto-redirects to login after success
- Provides retry and home buttons

#### `components/auth/LoginModal.tsx` (Updated)

- Shows success message after registration
- Displays "Resend Verification" button if needed
- Handles verification errors from login

---

### 4. **Database Migration**

#### `migrations/002_add_email_verification.sql`

```sql
ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN verification_token VARCHAR(255);
ALTER TABLE users ADD COLUMN verification_token_expires TIMESTAMP;

CREATE INDEX idx_users_verification_token ON users(verification_token);
CREATE INDEX idx_users_email_verified ON users(email_verified);
```

---

## 🎨 Email Design

### Verification Email Preview

**Features:**

- ✨ Premium cyber-punk gradient design
- 🎨 Dark theme with blue/purple accents
- 💎 Glassmorphism effects
- 📱 Fully responsive (mobile-friendly)
- 🔗 Primary button + backup link
- ⏰ Clear expiry notice
- 📸 Social media links in footer

**Color Scheme:**

- Background: Dark navy gradient
- Primary: #3b82f6 (Blue) → #8b5cf6 (Purple)
- Text: High contrast for readability
- Accents: Glowing borders and shadows

---

## 🔄 User Flow

### Registration Flow

```
1. User fills registration form
   ↓
2. System creates user (email_verified = FALSE)
   ↓
3. Generates verification token (24h expiry)
   ↓
4. Sends verification email
   ↓
5. User receives email
   ↓
6. User clicks "Verify Email" button
   ↓
7. Redirects to /verify-email?token=xxx
   ↓
8. System validates token
   ↓
9. Marks email as verified
   ↓
10. Sends welcome email
   ↓
11. Redirects to login page
   ↓
12. User can now login ✅
```

### Login Flow (Unverified User)

```
1. User tries to login
   ↓
2. System checks email_verified
   ↓
3. If FALSE: Shows error + "Resend" button
   ↓
4. User clicks "Resend Verification"
   ↓
5. New token generated
   ↓
6. New verification email sent
   ↓
7. User verifies email
   ↓
8. Can now login ✅
```

---

## 🧪 Testing Checklist

### Registration & Email

- [ ] Register with valid email
- [ ] Receive verification email (check spam folder too)
- [ ] Email displays correctly (HTML version)
- [ ] Email has proper branding and colors
- [ ] Verification button works
- [ ] Backup link works
- [ ] Token expiry time is correct (24h)

### Verification

- [ ] Click verification link from email
- [ ] Redirects to `/verify-email?token=xxx`
- [ ] Shows loading state
- [ ] Shows success message
- [ ] Receives welcome email
- [ ] Auto-redirects to login after 3 seconds
- [ ] Can manually click "Login Sekarang"

### Login Protection

- [ ] Try login before verification → Error shown
- [ ] Error message clear and helpful
- [ ] "Resend Verification" button appears
- [ ] Click resend → New email sent
- [ ] After verification → Login works ✅

### Edge Cases

- [ ] Invalid token → Error shown
- [ ] Expired token (>24h) → Error shown
- [ ] Already verified email → Appropriate message
- [ ] Resend to verified user → Error shown
- [ ] Non-existent email → Generic message (security)

---

## 🔐 Security Features

### Token Security

- ✅ **Cryptographically strong** - Random + timestamp
- ✅ **Single-use** - Token cleared after verification
- ✅ **Time-limited** - 24-hour expiry
- ✅ **Database-backed** - Not just signed JWT

### Email Security

- ✅ **No sensitive data** in emails
- ✅ **HTTPS verification links** (production)
- ✅ **Rate limiting** recommended for resend
- ✅ **Generic error messages** (don't reveal if email exists)

### SMTP Security

- ✅ **App passwords** (not account password)
- ✅ **TLS encryption** (STARTTLS on port 587)
- ✅ **Credentials in .env** (not in code)

---

## 🐛 Troubleshooting

### Email Not Sending

**Problem:** Email doesn't arrive

**Solutions:**

1. Check SMTP credentials in `.env.local`
2. Verify SMTP connection:
   ```typescript
   import { verifyEmailConnection } from '@/lib/email';
   await verifyEmailConnection();
   ```
3. Check spam/junk folder
4. Try different SMTP provider
5. Check server logs for errors

---

### Gmail "Less Secure Apps" Error

**Problem:** Gmail blocks connection

**Solution:**

1. Enable 2-Step Verification
2. Generate App Password (not regular password)
3. Use app password in `SMTP_PASS`

---

### Verification Link 404

**Problem:** Link goes to 404 page

**Solution:**

1. Check `NEXT_PUBLIC_SITE_URL` in `.env.local`
2. Ensure dev server is running
3. Verify `/app/verify-email/page.tsx` exists
4. Clear Next.js cache: `rm -rf .next`

---

### Token Expired Error

**Problem:** Token expired before user could verify

**Solution:**

1. Use "Resend Verification" button
2. Adjust expiry time in `lib/email.ts`:
   ```typescript
   expiresAt.setHours(expiresAt.getHours() + 48); // 48 hours instead of 24
   ```

---

### Email Shows as Plain Text

**Problem:** HTML email renders as plain text

**Solution:**

- Most email clients support HTML
- Fallback plain text is provided automatically
- Test in different email clients (Gmail, Outlook, etc.)

---

## 📊 SMTP Provider Comparison

| Provider     | Free Tier | Monthly Limit | Setup Difficulty | Recommended For |
| ------------ | --------- | ------------- | ---------------- | --------------- |
| **Gmail**    | ✅ Yes    | ~500/day      | Easy             | Development     |
| **SendGrid** | ✅ Yes    | 100/day       | Medium           | Production      |
| **Mailgun**  | ✅ Yes    | 5,000/month   | Medium           | Production      |
| **AWS SES**  | ✅ Yes    | 62,000/month  | Hard             | Enterprise      |
| **Postmark** | ❌ No     | -             | Easy             | Production      |
| **Resend**   | ✅ Yes    | 100/day       | Easy             | Modern Apps     |

---

## 🚀 Production Deployment

### Environment Variables (Vercel)

```
Dashboard → Settings → Environment Variables

Add:
- SMTP_HOST
- SMTP_PORT
- SMTP_SECURE
- SMTP_USER
- SMTP_PASS
- SMTP_FROM_NAME
- SMTP_FROM_EMAIL
- NEXT_PUBLIC_SITE_URL (https://your-domain.com)

Mark all as "Sensitive" ✅
Set environment: Production ✅
```

### Update Verification URLs

Before deploying, ensure:

```env
# Production
NEXT_PUBLIC_SITE_URL=https://jakartapartysquad.com

# Staging
NEXT_PUBLIC_SITE_URL=https://staging.jakartapartysquad.com

# Development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Test Production Emails

1. Register on production site
2. Verify email arrives
3. Check verification link points to production URL
4. Test verification flow end-to-end

---

## 🎨 Customizing Email Templates

### Change Colors

Edit `lib/email.ts`:

```typescript
// Change gradient colors
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);

// Change button colors
background: linear-gradient(135deg, #YOUR_PRIMARY 0%, #YOUR_SECONDARY 100%);

// Change text colors
color: #YOUR_TEXT_COLOR;
```

### Add Your Logo

Replace logo URL:

```html
<img src="https://your-domain.com/path/to/logo.png" alt="Your Company" />
```

### Change Expiry Time

In registration and resend endpoints:

```typescript
// Current: 24 hours
verificationExpires.setHours(verificationExpires.getHours() + 24);

// Change to 48 hours
verificationExpires.setHours(verificationExpires.getHours() + 48);

// Change to 7 days
verificationExpires.setDate(verificationExpires.getDate() + 7);
```

---

## 📞 Support

### Common Issues

1. **SMTP Connection Failed**
   - Verify credentials
   - Check firewall/network
   - Try different port (465 for SSL)

2. **Token Not Found**
   - Check database for token
   - Verify token hasn't expired
   - Check URL encoding

3. **Welcome Email Not Sending**
   - Non-critical, verification still works
   - Check SMTP rate limits
   - Review server logs

### Need Help?

- Check documentation: `AUTHENTICATION_QUICKSTART.md`
- Review API routes for error details
- Test SMTP connection: `verifyEmailConnection()`

---

## ✅ Summary

**What you have:**

- ✅ Complete email verification system
- ✅ Premium cyber-punk email design
- ✅ Secure token-based verification
- ✅ Resend verification functionality
- ✅ Beautiful verification page
- ✅ Login protection for unverified users
- ✅ Welcome email after verification
- ✅ Production-ready SMTP integration

**Next steps:**

1. Configure SMTP in `.env.local`
2. Test registration flow
3. Customize email templates (optional)
4. Deploy to production

---

**🎉 Email verification is ready to use!**
