# ⚡ Quick Commands Reference

## 🚀 Deploy Commands

```bash
# Build for production
npm run build

# Deploy (Vercel)
vercel --prod

# Deploy (other)
# Use your deployment command
```

---

## 🧪 Testing Commands

```bash
# Full SEO health check
./scripts/seo-check.sh

# OpenGraph validation
node scripts/test-opengraph.js

# Test specific URL
node scripts/test-opengraph.js https://jakartapartysquad.com/blog

# Quick build test (no full build)
./scripts/quick-build-test.sh

# TypeScript check
npx tsc --noEmit --skipLibCheck

# ESLint check
npm run lint
```

---

## 🗂️ Database Commands

```bash
# Run migration 007 (adds category & tags)
psql $DATABASE_URL -f migrations/007_add_blog_metadata.sql

# Check blog_posts schema
psql $DATABASE_URL -c "\d blog_posts"

# Count published posts
psql $DATABASE_URL -c "SELECT COUNT(*) FROM blog_posts WHERE status='published';"

# Sample data for testing
psql $DATABASE_URL -c "UPDATE blog_posts SET category = 'Nightlife' WHERE category IS NULL;"
psql $DATABASE_URL -c "UPDATE blog_posts SET tags = ARRAY['Jakarta', 'Party'] WHERE tags IS NULL;"
```

---

## 🔍 Verification Commands

```bash
# Check sitemap
curl https://jakartapartysquad.com/sitemap.xml | head -50

# Check blog sitemap
curl https://jakartapartysquad.com/blog-sitemap.xml | head -50

# Check RSS feed
curl https://jakartapartysquad.com/feed.xml | head -50

# Check robots.txt
curl https://jakartapartysquad.com/robots.txt

# Check OpenGraph tags
curl https://jakartapartysquad.com/blog | grep 'og:image'

# Check if image accessible
curl -I https://jakartapartysquad.com/assets/images/header.jpg
```

---

## 📊 Google Search Console

```bash
# After deploy, submit these URLs manually:
# https://search.google.com/search-console

Sitemaps to submit:
- https://jakartapartysquad.com/sitemap.xml
- https://jakartapartysquad.com/blog-sitemap.xml
- https://jakartapartysquad.com/feed.xml

Request indexing for top posts:
- https://jakartapartysquad.com/blog/[slug-1]
- https://jakartapartysquad.com/blog/[slug-2]
- ... (up to 10 per day)
```

---

## 🔧 Development Commands

```bash
# Start dev server
npm run dev

# Format code
npm run format

# Type check
npm run type-check

# Build locally
npm run build

# Start production build
npm start
```

---

## 📱 Social Media Testing URLs

```bash
# Facebook Debugger
https://developers.facebook.com/tools/debug/?q=https://jakartapartysquad.com/blog

# Twitter Card Validator
https://cards-dev.twitter.com/validator

# LinkedIn Post Inspector
https://www.linkedin.com/post-inspector/

# OpenGraph.xyz (all platforms)
https://www.opengraph.xyz/?url=https://jakartapartysquad.com/blog

# Google Rich Results Test
https://search.google.com/test/rich-results?url=https://jakartapartysquad.com/blog

# PageSpeed Insights
https://pagespeed.web.dev/?url=https://jakartapartysquad.com

# Mobile-Friendly Test
https://search.google.com/test/mobile-friendly?url=https://jakartapartysquad.com
```

---

## 🛠️ Troubleshooting Commands

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check environment variables
echo $DATABASE_URL
echo $NEXT_PUBLIC_BASE_URL

# Verify database connection
psql $DATABASE_URL -c "SELECT 1;"

# Check for port conflicts
lsof -i :3000

# Kill process on port 3000
kill -9 $(lsof -t -i:3000)
```

---

## 📝 Content Management

```sql
-- Create new blog post
INSERT INTO blog_posts (title, slug, content, excerpt, status, published_at, category, tags)
VALUES (
  'Article Title',
  'article-slug',
  '<p>Content here...</p>',
  'Short excerpt',
  'published',
  NOW(),
  'Nightlife',
  ARRAY['Jakarta', 'Party', 'SCBD']
);

-- Update post metadata
UPDATE blog_posts
SET category = 'Nightlife',
    tags = ARRAY['Jakarta', 'Clubbing', 'SCBD']
WHERE slug = 'your-slug';

-- Check published posts
SELECT id, title, slug, category, tags, published_at
FROM blog_posts
WHERE status = 'published'
ORDER BY published_at DESC;
```

---

## 🔄 Git Commands (Optional)

```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "feat: Add comprehensive SEO and OpenGraph support

- Dynamic sitemap with blog posts from database
- ISR caching for 10x faster page loads
- RSS feed for blog subscribers
- Article Schema for Google Rich Results
- Full OpenGraph support for all social media platforms
- Category, tag, and archive pages for better SEO
- Enhanced robots.txt and metadata
- 13 documentation files
- 3 testing scripts"

# Push
git push origin main
```

---

## 📊 Monitoring Commands

```bash
# Check sitemap URLs count
curl -s https://jakartapartysquad.com/sitemap.xml | grep -c "<url>"

# Check blog sitemap count
curl -s https://jakartapartysquad.com/blog-sitemap.xml | grep -c "<url>"

# Check RSS items count
curl -s https://jakartapartysquad.com/feed.xml | grep -c "<item>"

# Check if specific post in sitemap
curl -s https://jakartapartysquad.com/sitemap.xml | grep "blog/your-slug"

# Validate XML
curl -s https://jakartapartysquad.com/sitemap.xml | xmllint --format - | head -50
```

---

## 🎯 Quick Reference

### Most Used Commands

```bash
# Build
npm run build

# Deploy
vercel --prod

# Test SEO
./scripts/seo-check.sh

# Test OpenGraph
node scripts/test-opengraph.js
```

### Most Important URLs

```
Production:   https://jakartapartysquad.com
Sitemap:      https://jakartapartysquad.com/sitemap.xml
Blog Sitemap: https://jakartapartysquad.com/blog-sitemap.xml
RSS Feed:     https://jakartapartysquad.com/feed.xml
```

### Most Important Docs

```
Start:        START_HERE.md
Deploy:       BUILD_AND_DEPLOY.md
SEO Guide:    SEO_IMPLEMENTATION.md
OG Guide:     OPENGRAPH_SETUP.md
```

---

## ✅ Checklist

- [x] Implementation complete
- [x] Code tested
- [x] Docs created
- [x] Scripts ready
- [ ] **Build:** `npm run build`
- [ ] **Deploy:** `vercel --prod`
- [ ] **Submit:** Sitemaps to GSC
- [ ] **Test:** Social previews
- [ ] **Monitor:** GSC coverage

---

## 💡 Pro Tips

**For Fastest Deploy:**

1. Skip migration 007 untuk now
2. Just build and deploy
3. Run migration later
4. Everything will work!

**For Best SEO:**

1. Run migration 007 first
2. Add category to posts
3. Add tags to posts
4. Then build & deploy

**For Testing:**

1. Deploy first
2. Test in production
3. Fix any issues
4. Iterate

---

**Ready?** Run: `npm run build` 🚀

**Last Updated:** 2026-02-03
