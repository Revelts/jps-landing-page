# Blog Publish Button Debug Guide

## Issue

Tombol "Publish Now" di Blog Editor tidak berfungsi atau tidak ada respon.

## Enhanced Logging

### Frontend Logging (BlogEditor.tsx)

Ketika tombol diklik, console akan menampilkan:

```
🚀 Blog Editor - handleSubmit called { publishNow: true/false }
```

**Jika validasi gagal:**

```
❌ Validation failed: Title is required
❌ Validation failed: Slug is required
❌ Validation failed: Content is required
```

**Jika validasi berhasil:**

```
✅ Validation passed, preparing to submit
📤 Sending request to /api/admin/blog { title, slug, content, ... }
📥 Response received { status: 200, statusText: 'OK', ok: true }
📦 Response data: { success: true, message: '...', data: {...} }
✅ Blog post created successfully
🏁 handleSubmit finished
```

### Backend Logging (API Route)

Server console akan menampilkan:

```
📝 [API] POST /api/admin/blog - Request received
🔐 [API] Authenticating user...
✅ [API] User authenticated: { id: 1, name: '...', role: 'Admin' }
📦 [API] Request body received: { title: '...', slug: '...', ... }
🔍 [API] Checking if slug exists...
✅ [API] Slug is unique, inserting blog post...
💾 [API] Executing INSERT query...
✅ [API] Blog post created successfully: { id: 123 }
```

## Debug Panel

Di development mode, debug panel akan muncul di bawah form fields:

```
🔧 Debug Info:
Title: "My Blog Post"
Slug: "my-blog-post"
Content Length: 1234 chars
Content Valid: ✅
Can Submit: ✅ YES
```

## Troubleshooting Steps

### 1. Check Browser Console

Buka Chrome DevTools (F12) → Console tab. Klik tombol "Publish Now" dan lihat:

- ❓ Tidak ada log sama sekali → JavaScript error / tombol tidak terhubung
- ❓ Ada log "Validation failed" → Isi semua field yang required
- ❓ Ada log "Network error" → Cek koneksi / API endpoint
- ❓ Ada log "API returned error" → Cek server console untuk detail

### 2. Check Server Console

Lihat terminal yang menjalankan `npm run dev`:

- ❓ Tidak ada log API → Request tidak sampai ke server (CORS/network issue)
- ❓ "Authentication failed" → Token expired, refresh browser
- ❓ "Access denied - not admin" → User role bukan Admin
- ❓ Database error → Cek database connection

### 3. Test with Minimal Data

Isi form dengan data minimal:

- Title: "Test Post"
- Slug: "test-post" (auto-generated)
- Content: Ketik minimal 1 paragraf di editor

Klik "Save as Draft" dulu untuk test.

### 4. Check Network Tab

Chrome DevTools → Network tab:

- Filter: `Fetch/XHR`
- Cari request ke `/api/admin/blog`
- Status code:
  - 200 ✅ Success
  - 400 ❌ Validation error
  - 401 ❌ Not authenticated
  - 403 ❌ Not authorized (not admin)
  - 500 ❌ Server error

### 5. Common Issues

#### A. Content Validation Failing

Tiptap editor mungkin return `<p></p>` (empty paragraph). Check:

- Apakah benar-benar sudah ketik sesuatu di editor?
- Console log akan show: `Content is required { content: '<p></p>' }`

#### B. Button Disabled

Button akan disabled jika `isSubmitting = true`. Check:

- Apakah button stuck dalam loading state?
- Refresh page untuk reset state

#### C. No Authentication Token

- Logout dan login ulang
- Clear browser cookies
- Check `localStorage` untuk JWT token

#### D. Database Connection

```bash
# Test database connection
psql "postgresql://..." -c "SELECT COUNT(*) FROM blog_posts;"
```

## Quick Fix Commands

### Reset Form State (if stuck)

Refresh browser page (Cmd+R atau F5)

### Check if blog_posts table exists

```bash
psql "$DATABASE_URL" -c "\d blog_posts"
```

### View recent blog posts

```bash
psql "$DATABASE_URL" -c "SELECT id, title, status, created_at FROM blog_posts ORDER BY created_at DESC LIMIT 5;"
```

### Clear test data

```bash
psql "$DATABASE_URL" -c "DELETE FROM blog_posts WHERE slug LIKE 'test%';"
```

## Expected Success Flow

1. User fills form (title, slug optional, content)
2. User clicks "Publish Now" or "Save as Draft"
3. Button shows loading state (spinner + "Publishing..." text)
4. Request sent to API
5. API validates auth → validates data → inserts to DB
6. Success message appears (green box at top)
7. Form resets (all fields cleared)
8. Button returns to normal state

Total time: ~500ms - 2s depending on network/DB

## Next Steps

After adding debug logging, test again and check:

1. Browser console logs
2. Server terminal logs
3. Network tab in DevTools
4. Debug panel values

Share any error messages or unexpected behavior.
