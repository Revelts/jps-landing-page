# Fixed: Blog Content Not Updating (Cache Issue)

## Issue

Changes made directly to `blog_posts` table tidak muncul di website, kemungkinan karena Next.js ISR cache atau Neon serverless cache.

## Root Cause Analysis

### 1. Next.js ISR (Incremental Static Regeneration)

Blog pages menggunakan ISR dengan cache yang lama:

- **Blog list page** (`/blog`): `revalidate = 1800` (30 minutes)
- **Blog detail page** (`/blog/[slug]`): `revalidate = 3600` (1 hour)

### 2. API Route Cache Headers

API responses punya aggressive caching:

- **`/api/blog`**: `max-age=1800` (30 minutes)
- **`/api/blog/[slug]`**: `max-age=3600` (1 hour)

### 3. Browser/CDN Cache

Client-side fetch tidak punya cache-busting, jadi browser bisa serve stale data.

### 4. No Cache Invalidation

Ketika admin create/update blog post, tidak ada automatic cache invalidation.

## Solutions Implemented

### ✅ 1. Reduced Cache Times

#### Before:

```typescript
// Blog list page
export const revalidate = 1800; // 30 minutes

// Blog detail page
export const revalidate = 3600; // 1 hour

// API routes
'Cache-Control': 'max-age=1800' // 30 min - 1 hour
```

#### After:

```typescript
// Blog list page
export const revalidate = 300; // 5 minutes

// Blog detail page
export const revalidate = 300; // 5 minutes

// API routes
'Cache-Control': 'max-age=300' // 5 minutes
```

### ✅ 2. Added Cache-Busting to Client Components

#### `BlogList.tsx`:

```typescript
useEffect(() => {
  const fetchPosts = async () => {
    // Add timestamp to force fresh data
    const timestamp = new Date().getTime();
    const response = await fetch(`/api/blog?_t=${timestamp}`, {
      cache: 'no-store', // Disable browser cache
    });
    // ...
  };
}, []);
```

#### `BlogDetail.tsx`:

```typescript
useEffect(() => {
  const fetchPost = async () => {
    // Add timestamp to force fresh data
    const timestamp = new Date().getTime();
    const response = await fetch(`/api/blog/${slug}?_t=${timestamp}`, {
      cache: 'no-store', // Disable browser cache
    });
    // ...
  };
}, [slug]);
```

### ✅ 3. On-Demand Revalidation (Admin Actions)

When admin creates or updates blog post, automatically clear cache:

```typescript
// In /api/admin/blog POST and PUT
const result = await query(sql, params);

// Trigger cache revalidation
try {
  const { revalidatePath } = await import('next/cache');
  revalidatePath('/blog', 'page'); // Clear blog list cache
  revalidatePath(`/blog/${slug}`, 'page'); // Clear detail page cache
  console.log('🔄 [API] Cache revalidated for blog pages');
} catch (error) {
  console.warn('⚠️ Cache revalidation failed (non-critical)');
}
```

### ✅ 4. API Routes Always Fresh

```typescript
// /api/blog/route.ts
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always get fresh data

// /api/blog/[slug]/route.ts
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always get fresh data
```

## Cache Strategy Overview

### Development Mode

- ✅ No caching - changes appear immediately
- ✅ Hot reload enabled
- ✅ Fresh data on every request

### Production Mode

#### Level 1: API Routes (Serverless)

- `revalidate = 0` → Always query database
- No API-level cache
- Fast with Neon serverless pooling

#### Level 2: Pages (Static Generation)

- `revalidate = 300` (5 minutes)
- Pre-rendered HTML cached
- Auto-regenerates every 5 minutes
- Manual revalidation on admin actions

#### Level 3: Client (Browser)

- `cache: 'no-store'` in fetch
- Timestamp query param (`?_t=...`)
- No browser cache for blog content

#### Level 4: CDN (Vercel Edge)

- `Cache-Control: max-age=300`
- Edge cache revalidates every 5 minutes
- `stale-while-revalidate=600` for graceful updates

## Testing Instructions

### Test 1: Admin Updates Blog (Immediate Refresh)

1. **Create new blog post:**

   ```
   http://localhost:3000/dashboard/blog
   ```

   - Title: "Cache Test Post"
   - Content: "Original content version 1"
   - Click "Publish Now"

2. **Check blog list immediately:**

   ```
   http://localhost:3000/blog
   ```

   - New post should appear at top ✅
   - If not visible, check console for revalidation logs

3. **Check blog detail:**
   ```
   http://localhost:3000/blog/cache-test-post
   ```

   - Content should match what you just published ✅

### Test 2: Direct Database Edit (Max 5 Min Wait)

1. **Update content directly in database:**

   ```sql
   UPDATE blog_posts
   SET content = '<p>Updated content version 2</p>',
       updated_at = NOW()
   WHERE slug = 'cache-test-post';
   ```

2. **Hard refresh browser (Cmd+Shift+R):**

   ```
   http://localhost:3000/blog/cache-test-post
   ```

   - Should see updated content immediately ✅

3. **If still showing old content:**
   - Wait max 5 minutes for ISR revalidation
   - OR restart dev server: `npm run dev`
   - OR clear Next.js cache: `rm -rf .next`

### Test 3: Verify Logs

**Browser Console:**

```
🚀 Blog Editor - handleSubmit called
✅ Blog post created successfully
```

**Server Terminal:**

```
✅ [API] Blog post created successfully: { id: 123 }
🔄 [API] Cache revalidated for blog pages
```

## Manual Cache Clear Commands

### Clear Next.js Build Cache:

```bash
rm -rf .next
npm run dev
```

### Clear Vercel Production Cache:

```bash
# Via Vercel CLI
vercel --prod --force

# Or in Vercel dashboard:
# Project Settings → Data Cache → Purge Everything
```

### Force Browser Cache Clear:

- **Hard Refresh:** Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)
- **Clear All:** Chrome DevTools → Network tab → Right-click → Clear browser cache

## Cache Comparison

### Before (Aggressive Caching):

```
Blog List:     30 min cache
Blog Detail:   1 hour cache
API Routes:    30 min - 1 hour cache
Client Fetch:  Browser default cache
Result:        Changes take 30-60 minutes to appear
```

### After (Balanced Caching):

```
Blog List:     5 min cache + auto-revalidate on admin action
Blog Detail:   5 min cache + auto-revalidate on admin action
API Routes:    No cache (always fresh)
Client Fetch:  No cache (cache-busting enabled)
Result:        Changes appear immediately for admin,
               max 5 minutes for public users
```

## Files Modified

1. **`app/blog/page.tsx`**
   - `revalidate: 1800` → `300` (30 min → 5 min)

2. **`app/blog/[slug]/page.tsx`**
   - `revalidate: 3600` → `300` (1 hour → 5 min)

3. **`app/api/blog/route.ts`**
   - Added `revalidate = 0`
   - Cache-Control: `1800` → `300` (30 min → 5 min)

4. **`app/api/blog/[slug]/route.ts`**
   - Added `revalidate = 0`
   - Cache-Control: `3600` → `300` (1 hour → 5 min)

5. **`app/api/admin/blog/route.ts`** (POST & PUT)
   - Added `revalidatePath('/blog')` after create/update
   - Added `revalidatePath('/blog/[slug]')` after create/update

6. **`app/blog/components/BlogList.tsx`**
   - Added timestamp query param: `?_t=${Date.now()}`
   - Added `cache: 'no-store'` to fetch options

7. **`app/blog/[slug]/components/BlogDetail.tsx`**
   - Added timestamp query param: `?_t=${Date.now()}`
   - Added `cache: 'no-store'` to fetch options

## Performance Impact

### Before:

- ✅ Fast: Aggressive caching = very fast load times
- ❌ Stale: Content updates delayed 30-60 minutes
- ❌ Admin Experience: Need to wait or manually clear cache

### After:

- ✅ Fresh: Content updates appear in 0-5 minutes
- ✅ Admin Experience: Immediate feedback after publish
- ✅ Still Fast: 5-minute cache is reasonable for blog content
- ✅ SEO: Still benefits from ISR pre-rendering

## When to Adjust Cache Times

### More Aggressive (Faster Updates):

```typescript
// If you need near real-time updates
export const revalidate = 60; // 1 minute

// For breaking news / time-sensitive content
export const revalidate = 0; // No cache (dynamic)
```

### More Conservative (Better Performance):

```typescript
// If content rarely changes
export const revalidate = 3600; // 1 hour

// For archived/historical content
export const revalidate = 86400; // 24 hours
```

## Troubleshooting

### Issue: Changes still not appearing

**Step 1: Hard refresh browser**

```
Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)
```

**Step 2: Check server logs**
Look for:

```
✅ [API] Blog post created successfully
🔄 [API] Cache revalidated for blog pages
```

**Step 3: Restart dev server**

```bash
# Stop server (Ctrl+C)
npm run dev
```

**Step 4: Clear Next.js cache**

```bash
rm -rf .next
npm run dev
```

**Step 5: Verify database changes**

```sql
-- Check if your changes are in DB
SELECT id, title, LEFT(content, 50) as content_preview, updated_at
FROM blog_posts
WHERE slug = 'your-slug'
ORDER BY updated_at DESC;
```

### Issue: Revalidation not working

**Check console for:**

```
⚠️ [API] Cache revalidation failed (non-critical)
```

**Possible causes:**

- Running in Pages Router (revalidatePath is App Router only)
- Next.js version < 13.4
- Server not running in correct mode

**Workaround:**
Clear cache manually after each publish:

```bash
rm -rf .next/cache
```

## Best Practices

### ✅ DO:

- Use ISR with short revalidation times (5-15 min) for blogs
- Use on-demand revalidation for admin actions
- Add cache-busting for client-side fetches
- Test with hard refresh after direct DB edits

### ❌ DON'T:

- Set `revalidate = 0` on all pages (kills performance)
- Disable all caching (unnecessary DB load)
- Forget to revalidate after admin actions
- Use `force-dynamic` on public pages (bad for SEO)

## Quick Commands

### See current blog posts:

```bash
psql "$DATABASE_URL" -c "SELECT id, title, status, updated_at FROM blog_posts ORDER BY updated_at DESC LIMIT 5;"
```

### Force cache clear (development):

```bash
rm -rf .next && npm run dev
```

### Test cache headers:

```bash
curl -I http://localhost:3000/api/blog | grep -i cache
```

## Summary

✅ **Cache times reduced:** 30 min / 1 hour → 5 minutes
✅ **Auto-revalidation:** Added for admin create/update actions
✅ **Cache-busting:** Added timestamp params to client fetches
✅ **No browser cache:** `cache: 'no-store'` on all blog fetches

**Result:** Blog content updates appear immediately after admin publish, and within 5 minutes for direct database edits.

**Test sekarang:** Edit blog di dashboard, publish, dan check `/blog` page langsung!
