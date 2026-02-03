# Dashboard & Blacklist API Setup Guide

## Overview

Sistem dashboard terproteksi dengan fitur:

- **Blacklist Management**: CRUD operations dengan API integration
- **Invoice Generator**: Generate professional invoices dengan PDF export
- **Authentication**: Protected routes, hanya user login yang bisa akses

---

## 1. Database Migration

### Jalankan Migration Blacklist

```bash
# Jalankan migration untuk membuat tabel blacklist
npx tsx scripts/migrate.ts
```

Migration ini akan membuat:

- Tabel `blacklist` dengan kolom: id, name, phone, instagram, reason, created_at, updated_at, created_by, updated_by
- Indexes untuk performa search yang lebih cepat (phone, instagram, name, created_at)

### File Migration

- **File**: `migrations/003_create_blacklist.sql`
- **Deskripsi**: Creates blacklist table dengan foreign key ke users table

---

## 2. Seeder - Import Data Blacklist

### Jalankan Seeder

```bash
# Import data dari blacklist.json ke database
npx tsx scripts/seed-blacklist.ts
```

### Force Re-seed (Hapus data lama dan seed ulang)

```bash
# Jika ingin clear existing data dan seed ulang
FORCE_SEED=true npx tsx scripts/seed-blacklist.ts
```

Script ini akan:

- Check apakah data sudah ada
- Import 15 entries dari `data/blacklist.json`
- Konversi value "-" menjadi NULL
- Show sample data setelah seeding

---

## 3. API Endpoints

### Blacklist API

#### GET /api/blacklist

Get all blacklist entries dengan search & pagination

**Query Parameters:**

- `search` (optional): Search by name, phone, or instagram
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 50): Items per page

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Lisa",
      "phone": "085814417004",
      "instagram": "@pristianalisa",
      "reason": "Blacklist Hosting",
      "created_at": "2025-01-14T00:00:00.000Z",
      "updated_at": "2025-01-14T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 15,
    "totalPages": 1
  }
}
```

#### POST /api/blacklist

Create new blacklist entry

**Request Body:**

```json
{
  "name": "John Doe",
  "phone": "081234567890",
  "instagram": "@johndoe",
  "reason": "Blacklist Hosting"
}
```

#### GET /api/blacklist/[id]

Get single blacklist entry by ID

#### PUT /api/blacklist/[id]

Update blacklist entry

#### DELETE /api/blacklist/[id]

Delete blacklist entry

#### GET /api/blacklist/stats

Get blacklist statistics

**Response:**

```json
{
  "success": true,
  "data": {
    "total": 15,
    "withPhone": 15,
    "withInstagram": 13,
    "withBoth": 13
  }
}
```

---

## 4. Dashboard Access

### URLs

- **Dashboard Home**: `/dashboard`
- **Blacklist Management**: `/dashboard/blacklist`
- **Invoice Generator**: `/dashboard/invoice`

### Authentication

Semua halaman dashboard **terproteksi** dan memerlukan:

1. User harus login
2. Session token valid
3. Auto-redirect ke `/login?redirect=/dashboard` jika belum login

### Features

#### Dashboard Home

- Overview cards untuk quick access
- Link ke Blacklist dan Invoice

#### Blacklist Management

- View all blacklist entries
- Search by name, phone, or Instagram
- Add new entries
- Delete entries
- Real-time statistics

#### Invoice Generator

- Create professional invoices
- Add multiple line items
- Dynamic total calculation
- Download PDF
- Custom date picker

---

## 5. Testing

### Test API Endpoints

```bash
# Test GET all blacklist (perlu login dulu)
curl http://localhost:3000/api/blacklist \
  -H "Cookie: session_token=YOUR_SESSION_TOKEN"

# Test GET stats
curl http://localhost:3000/api/blacklist/stats \
  -H "Cookie: session_token=YOUR_SESSION_TOKEN"

# Test POST new entry
curl -X POST http://localhost:3000/api/blacklist \
  -H "Content-Type: application/json" \
  -H "Cookie: session_token=YOUR_SESSION_TOKEN" \
  -d '{
    "name": "Test User",
    "phone": "081234567890",
    "instagram": "@testuser",
    "reason": "Test reason"
  }'
```

### Manual Testing

1. **Login**:
   - Buka `http://localhost:3000/login`
   - Login dengan account yang sudah terdaftar

2. **Access Dashboard**:
   - Buka `http://localhost:3000/dashboard`
   - Verify redirect works jika belum login

3. **Test Blacklist**:
   - Klik "Blacklist Management"
   - Test search functionality
   - Add new entry
   - Delete entry

4. **Test Invoice**:
   - Klik "Invoice Generator"
   - Add items
   - Download PDF

---

## 6. File Structure

```
app/
├── dashboard/                          # Dashboard pages (protected)
│   ├── layout.tsx                     # Dashboard layout with auth check
│   ├── page.tsx                       # Dashboard home
│   ├── components/
│   │   ├── DashboardHeader.tsx        # Top header with user info
│   │   └── DashboardNav.tsx           # Sidebar navigation
│   ├── blacklist/
│   │   ├── page.tsx                   # Blacklist management page
│   │   └── components/
│   │       ├── BlacklistManager.tsx   # Main manager component
│   │       ├── BlacklistStats.tsx     # Statistics display
│   │       ├── BlacklistSearch.tsx    # Search input
│   │       ├── BlacklistTable.tsx     # Table display
│   │       └── AddBlacklistModal.tsx  # Add entry modal
│   └── invoice/
│       ├── page.tsx                   # Invoice page
│       └── InvoicePageClient.tsx      # Invoice client component
├── api/
│   └── blacklist/
│       ├── route.ts                   # GET & POST endpoints
│       ├── [id]/route.ts              # GET, PUT, DELETE by ID
│       └── stats/route.ts             # Statistics endpoint
lib/
├── auth-middleware.ts                 # Authentication middleware
└── db.ts                              # Database connection
migrations/
└── 003_create_blacklist.sql           # Blacklist table migration
scripts/
└── seed-blacklist.ts                  # Blacklist seeder script
```

---

## 7. Security

### Authentication Middleware

Semua API endpoints dan dashboard pages dilindungi dengan:

- Session token validation
- User authentication check
- Auto-redirect untuk unauthenticated users

### Authorization

- Hanya logged-in users yang bisa:
  - View blacklist entries
  - Add/edit/delete entries
  - Generate invoices
  - Access dashboard

### Data Protection

- Blacklist data tidak di-index oleh search engines (`robots: noindex`)
- API endpoints memerlukan valid session
- CORS protection via Next.js defaults

---

## 8. Next Steps

### Production Deployment

1. **Environment Variables**:
   - Pastikan `DATABASE_URL` sudah di-set di production
   - Verify session secret dan email configs

2. **Run Migrations**:

   ```bash
   # Di production
   npx tsx scripts/migrate.ts
   ```

3. **Seed Data** (optional):

   ```bash
   npx tsx scripts/seed-blacklist.ts
   ```

4. **Test Authentication**:
   - Verify login works
   - Test protected routes
   - Check session expiry

### Future Enhancements

- [ ] Edit blacklist entry functionality
- [ ] Export blacklist to CSV/Excel
- [ ] Advanced filtering (by date, reason)
- [ ] Bulk delete/import
- [ ] Activity logs (who created/updated entries)
- [ ] Email notifications for new entries
- [ ] Dashboard analytics (charts, graphs)

---

## 9. Troubleshooting

### Issue: Migration Failed

```bash
# Check database connection
npx tsx scripts/test-query.ts

# Check if users table exists (required for foreign key)
# Run previous migrations first
```

### Issue: Seeder Failed

```bash
# Check if migration ran successfully
# Verify blacklist.json exists and is valid JSON
# Check database permissions
```

### Issue: API Returns 401 Unauthorized

```bash
# Verify user is logged in
# Check session token in cookies
# Verify session hasn't expired
```

### Issue: Dashboard Shows "Authentication Required"

```bash
# Clear browser cookies
# Login again
# Check if session is valid in database
```

---

## 10. Support

Jika ada issue atau pertanyaan:

1. Check logs di terminal
2. Verify database connection
3. Check migrations sudah dijalankan
4. Verify user sudah login

---

**Setup Complete! 🎉**

Dashboard dan Blacklist API sudah siap digunakan dengan full authentication dan CRUD operations.
