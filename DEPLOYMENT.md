# Deployment Guide

## Prerequisites

Before deploying, ensure you have:

- [ ] Node.js 22.x installed
- [ ] npm 10.x installed
- [ ] Git repository initialized
- [ ] All dependencies installed (`npm install`)
- [ ] Production build successful (`npm run build`)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

If you encounter permission errors, try:

```bash
# Clear npm cache
npm cache clean --force

# Or install with different permissions
sudo npm install
```

### 2. Environment Variables

Create `.env.local` file:

```bash
NEXT_PUBLIC_SITE_URL=https://jakartapartysquad.com
```

### 3. Build for Production

```bash
npm run build
```

Expected output:

```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (7/7)
✓ Finalizing page optimization

Route (app)                        Size     First Load JS
┌ ○ /                             140 B           120 kB
├ ○ /about                        180 B           125 kB
├ ○ /community                    165 B           122 kB
├ ○ /partners                     170 B           123 kB
├ ○ /gallery                      175 B           124 kB
├ ○ /contact                      160 B           121 kB
└ ○ /privacy                      155 B           120 kB
```

### 4. Test Production Build

```bash
npm start
```

Visit `http://localhost:3000` and verify all pages work.

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is built by the creators of Next.js and provides optimal performance.

#### Automatic Deployment (Git)

1. Push code to GitHub/GitLab/Bitbucket:

   ```bash
   git add .
   git commit -m "Refactor to App Router with mobile-first design"
   git push origin main
   ```

2. Connect repository to Vercel:
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. Configure domain:
   - Go to Project Settings → Domains
   - Add `jakartapartysquad.com`
   - Update DNS records as instructed

#### Manual Deployment (CLI)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Environment Variables** (Vercel Dashboard):

```
NEXT_PUBLIC_SITE_URL=https://jakartapartysquad.com
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Build Settings**:

- Build command: `npm run build`
- Publish directory: `.next`
- Functions directory: `.netlify/functions`

### Option 3: Docker

Create `Dockerfile`:

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t jps-landing .
docker run -p 3000:3000 jps-landing
```

### Option 4: Traditional VPS (Ubuntu/Debian)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone <your-repo-url>
cd jps-landing-page

# Install dependencies
npm install

# Build
npm run build

# Install PM2 for process management
sudo npm install -g pm2

# Start application
pm2 start npm --name "jps-landing" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

**Nginx Configuration** (`/etc/nginx/sites-available/jakartapartysquad`):

```nginx
server {
    listen 80;
    server_name jakartapartysquad.com www.jakartapartysquad.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/jakartapartysquad /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL/HTTPS Setup

### Vercel/Netlify

✅ Automatic HTTPS with Let's Encrypt

### VPS with Nginx

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d jakartapartysquad.com -d www.jakartapartysquad.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Post-Deployment Checklist

### 1. Verify Deployment

- [ ] All pages load correctly
- [ ] Navigation works (header/footer)
- [ ] Mobile menu functions
- [ ] Images display properly
- [ ] External links work (Instagram, WhatsApp, etc.)
- [ ] HTTPS is active

### 2. SEO Configuration

- [ ] Submit sitemap to Google Search Console

  ```
  https://jakartapartysquad.com/sitemap.xml
  ```

- [ ] Add property to Google Search Console
  - Verify ownership (DNS or meta tag)
  - Submit all pages for indexing

- [ ] Test with SEO tools:
  - [Google PageSpeed Insights](https://pagespeed.web.dev/)
  - [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
  - [Structured Data Testing Tool](https://validator.schema.org/)

### 3. Performance Monitoring

- [ ] Set up Vercel Analytics (if using Vercel)
- [ ] Configure Google Analytics 4

  ```typescript
  // Add to app/layout.tsx
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
    strategy="afterInteractive"
  />
  ```

- [ ] Monitor Core Web Vitals
  - LCP < 2.5s
  - FID/INP < 100ms
  - CLS < 0.1

### 4. Social Media Updates

- [ ] Update Instagram bio link
- [ ] Update TikTok bio link
- [ ] Update WhatsApp group description
- [ ] Post announcement about new website

### 5. DNS Configuration

Update DNS records:

| Type  | Name | Value                | TTL  |
| ----- | ---- | -------------------- | ---- |
| A     | @    | [Vercel IP]          | 3600 |
| CNAME | www  | cname.vercel-dns.com | 3600 |

## Monitoring & Maintenance

### Regular Checks

**Weekly**:

- Check Google Search Console for errors
- Review Core Web Vitals
- Monitor uptime (use UptimeRobot or similar)

**Monthly**:

- Update dependencies (`npm update`)
- Check security vulnerabilities (`npm audit`)
- Review analytics data
- Backup configuration and content

### Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update Next.js specifically
npm install next@latest react@latest react-dom@latest

# Test after updates
npm run build
npm start
```

## Rollback Procedure

If issues occur after deployment:

### Vercel

1. Go to Deployments
2. Find previous working deployment
3. Click "⋯" → "Promote to Production"

### Manual

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback to specific commit
git reset --hard <commit-hash>
git push origin main --force
```

## Troubleshooting

### Build Fails

**Error**: Module not found

```bash
# Clear .next and node_modules
rm -rf .next node_modules
npm install
npm run build
```

**Error**: Out of memory

```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Images Not Loading

Check:

- Images exist in `/public/assets/images/`
- Correct file extensions (.jpg, .png)
- Proper capitalization in paths

### Slow Performance

1. Check image sizes (should be < 500KB each)
2. Enable compression:
   ```javascript
   // next.config.js
   compress: true;
   ```
3. Use CDN for static assets

### SEO Issues

1. Verify metadata in each page
2. Check robots.txt allows indexing
3. Submit sitemap to Google
4. Ensure canonical URLs are correct

## Support Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **GitHub Issues**: [Your repo issues page]
- **Community Discord**: https://discord.gg/UshBBJkDS8

## Security Best Practices

- [ ] Keep dependencies updated
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS only
- [ ] Set up security headers in next.config.js
- [ ] Regular security audits with `npm audit`

## Backup Strategy

**What to backup**:

- `/config/index.json` - Content configuration
- `/public/assets/` - Images and media
- `package.json` - Dependencies
- Environment variables

**Where to backup**:

- Git repository (version control)
- Cloud storage (Google Drive, Dropbox)
- Local development machine

## Performance Targets

Aim for these metrics:

| Metric                 | Target  | Current |
| ---------------------- | ------- | ------- |
| Lighthouse Performance | > 90    | TBD     |
| Lighthouse SEO         | 100     | TBD     |
| First Contentful Paint | < 1.8s  | TBD     |
| Time to Interactive    | < 3.8s  | TBD     |
| Total Blocking Time    | < 300ms | TBD     |

Monitor and optimize continuously!

---

**Last Updated**: January 2026
**Deployment Ready**: ✅ Yes
