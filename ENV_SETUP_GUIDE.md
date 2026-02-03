# 🔧 Environment Variables Setup Guide

Complete guide for setting up your `.env.local` file with Neon Serverless PostgreSQL.

---

## 🚀 Quick Start (3 Steps)

### Step 1: Copy the Example File

```bash
cp .env.example .env.local
```

### Step 2: Add Your Database URL

Open `.env.local` and add your Neon database URL:

```env
DATABASE_URL=postgresql://neondb_owner:npg_6RkFWN9EZwUj@ep-snowy-hill-ah73k14i-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Step 3: Set JWT Secret

Generate a secure JWT secret:

```bash
# Option 1: Using OpenSSL (macOS/Linux)
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Use online generator
# https://www.javainuse.com/jwtgenerator
```

Then add it to `.env.local`:

```env
JWT_SECRET=your-generated-secret-here
```

**Done!** You're ready to run the app.

---

## 📦 Required Environment Variables

### 1. **DATABASE_URL** (Required)

Your Neon PostgreSQL connection string.

```env
DATABASE_URL=postgresql://neondb_owner:npg_6RkFWN9EZwUj@ep-snowy-hill-ah73k14i-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**Where to get it:**

- Neon Dashboard → Your Project → Connection Details
- Use the **pooled connection** (ends with `-pooler`)

**Alternative names (auto-detected):**

- `POSTGRES_URL` - Vercel Postgres template format
- `POSTGRES_PRISMA_URL` - For Prisma migrations

**The app automatically checks these in order:**

1. `DATABASE_URL` ← Primary
2. `POSTGRES_URL` ← Fallback #1
3. `POSTGRES_PRISMA_URL` ← Fallback #2

### 2. **JWT_SECRET** (Required)

Secret key for generating JWT authentication tokens.

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Security Requirements:**

- ✅ At least 32 characters
- ✅ Random and unpredictable
- ✅ Different for each environment (dev/staging/prod)
- ❌ Never commit to git
- ❌ Never share publicly

---

## 🌐 Optional Environment Variables

### Application URLs

```env
# Your site's public URL (for OG tags, canonical URLs, etc.)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Production example:**

```env
NEXT_PUBLIC_SITE_URL=https://jakartapartysquad.com
```

### Analytics (Google Tag Manager)

```env
NEXT_PUBLIC_GTM_ID=GTM-NF8RL7T3
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_GTM_DEBUG=false
```

---

## 🗄️ Neon Database Connection Options

Neon provides multiple connection strings. Here's when to use each:

### Option 1: Pooled Connection (RECOMMENDED ✅)

```env
DATABASE_URL=postgresql://neondb_owner:npg_6RkFWN9EZwUj@ep-snowy-hill-ah73k14i-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**Use for:**

- ✅ Production apps
- ✅ Vercel deployments
- ✅ High-traffic applications
- ✅ Serverless functions

**Benefits:**

- Connection pooling via PgBouncer
- Better performance
- Handles many concurrent connections
- **This is what you should use 95% of the time**

### Option 2: Direct Connection (Unpooled)

```env
DATABASE_URL_UNPOOLED=postgresql://neondb_owner:npg_6RkFWN9EZwUj@ep-snowy-hill-ah73k14i.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**Use for:**

- Database migrations
- Admin tasks
- Long-running queries
- Tools that need direct access

**Note:** Remove `-pooler` from hostname

### Option 3: Prisma URL (For Migrations)

```env
POSTGRES_PRISMA_URL=postgresql://neondb_owner:npg_6RkFWN9EZwUj@ep-snowy-hill-ah73k14i-pooler.c-3.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
```

**Use for:**

- Prisma migrations
- Includes connection timeout
- Useful for CI/CD pipelines

---

## 🔒 Security Best Practices

### ✅ DO:

1. **Use `.env.local` for development**

   ```bash
   # .env.local is in .gitignore
   cp .env.example .env.local
   ```

2. **Generate strong JWT secrets**

   ```bash
   openssl rand -base64 32
   ```

3. **Use different secrets per environment**
   - Development: One secret
   - Staging: Different secret
   - Production: Different secret

4. **Set production variables in Vercel dashboard**

   ```
   Vercel Dashboard → Settings → Environment Variables
   ```

5. **Rotate secrets periodically**
   - Change JWT_SECRET every 3-6 months
   - Update all environments

### ❌ DON'T:

1. **Never commit .env.local**

   ```bash
   # Already in .gitignore
   .env.local
   .env*.local
   ```

2. **Never hardcode credentials**

   ```javascript
   // ❌ BAD
   const dbUrl = 'postgresql://user:pass@host/db';

   // ✅ GOOD
   const dbUrl = process.env.DATABASE_URL;
   ```

3. **Never share .env files**
   - Don't send via email
   - Don't post in Slack
   - Don't commit to git

4. **Never use default secrets in production**

   ```env
   # ❌ BAD (default/weak secret)
   JWT_SECRET=your-secret-key-change-in-production

   # ✅ GOOD (strong random secret)
   JWT_SECRET=Xk8p2V9mQ3nR7wY4tE6uI1oP5aS8dF0gH3jK6lZ9xC2vB7nM4qW1
   ```

---

## 🚀 Deployment Environments

### Local Development

**File:** `.env.local`

```env
DATABASE_URL=postgresql://...-pooler.neon.tech/neondb?sslmode=require
JWT_SECRET=dev-secret-for-local-only
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### Vercel Production

**Set in:** Vercel Dashboard → Environment Variables

```env
DATABASE_URL=postgresql://...-pooler.neon.tech/neondb?sslmode=require
JWT_SECRET=production-super-secret-random-string
NEXT_PUBLIC_SITE_URL=https://jakartapartysquad.com
NODE_ENV=production
```

**Important:**

- Use Vercel's "Production" environment scope
- Enable "Sensitive" option for DATABASE_URL and JWT_SECRET
- Never expose these in client-side code

---

## 🧪 Testing Your Setup

### 1. Check Environment Variables

```bash
# Start dev server
npm run dev

# Check if env vars are loaded
curl http://localhost:3000/api/auth/init
```

**Expected response:**

```json
{
  "success": true,
  "message": "Database initialized successfully"
}
```

### 2. Test Database Connection

```bash
# Should create tables without errors
curl http://localhost:3000/api/auth/init
```

### 3. Test Registration

1. Open http://localhost:3000
2. Click "Login" button
3. Click "Daftar sekarang"
4. Fill in form and register

**If successful:**

- ✅ User created in database
- ✅ JWT token generated
- ✅ Logged in automatically

---

## 🐛 Troubleshooting

### Error: "Database URL not found"

**Problem:** `DATABASE_URL` not set in `.env.local`

**Solution:**

```bash
# Make sure .env.local exists
ls -la .env.local

# Check if DATABASE_URL is set
grep DATABASE_URL .env.local

# If missing, add it:
echo 'DATABASE_URL=postgresql://...' >> .env.local

# Restart dev server
npm run dev
```

### Error: "Connection failed" / "ECONNREFUSED"

**Problem:** Invalid database URL or network issue

**Solution:**

1. Check your Neon dashboard - is database active?
2. Verify connection string is correct
3. Ensure you're using the **pooled** connection (with `-pooler`)
4. Check firewall/network settings

```bash
# Test connection with psql
psql "postgresql://neondb_owner:npg_6RkFWN9EZwUj@ep-snowy-hill-ah73k14i-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### Error: "JWT_SECRET is not defined"

**Problem:** JWT_SECRET missing or not loaded

**Solution:**

```bash
# Add to .env.local
echo 'JWT_SECRET=your-secret-here' >> .env.local

# Generate a secure one
openssl rand -base64 32 | xargs -I {} echo "JWT_SECRET={}" >> .env.local

# Restart dev server
npm run dev
```

### Changes to .env.local not working

**Problem:** Next.js caches environment variables

**Solution:**

```bash
# Stop server (Ctrl+C)
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

---

## 📋 Checklist

Use this checklist to ensure your environment is set up correctly:

### Development Setup

- [ ] Copied `.env.example` to `.env.local`
- [ ] Set `DATABASE_URL` with Neon pooled connection
- [ ] Generated and set strong `JWT_SECRET`
- [ ] Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- [ ] Installed dependencies (`npm install`)
- [ ] Started dev server (`npm run dev`)
- [ ] Initialized database (`curl http://localhost:3000/api/auth/init`)
- [ ] Tested login/registration

### Production Deployment (Vercel)

- [ ] Added `DATABASE_URL` to Vercel environment variables
- [ ] Generated new `JWT_SECRET` for production (different from dev)
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Marked sensitive vars as "Sensitive" in Vercel
- [ ] Set variables to "Production" environment
- [ ] Deployed and tested live site
- [ ] Verified database connection works
- [ ] Tested login/registration on production

---

## 🔗 Useful Resources

- **Neon Dashboard:** https://console.neon.tech
- **Neon Documentation:** https://neon.tech/docs
- **Vercel Environment Variables:** https://vercel.com/docs/environment-variables
- **Next.js Environment Variables:** https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- **JWT.io:** https://jwt.io (decode/verify tokens)

---

## 📞 Need Help?

If you're still having issues:

1. Check the console for detailed error messages
2. Verify all environment variables are spelled correctly
3. Ensure you're using the pooled connection URL
4. Restart your dev server after changing .env.local
5. Check Neon dashboard - is your database active?

---

**✅ Once everything is set up, you're ready to run your authentication system!**
