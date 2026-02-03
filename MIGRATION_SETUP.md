# 🚀 Database Migration Setup

## ✅ Migration System Created

I've created a complete migration system for your database!

### 📁 Files Created:

1. **`migrations/001_create_users_and_sessions.sql`** - Database schema
2. **`scripts/migrate.ts`** - Migration runner script
3. **Package scripts** - Added `npm run migrate` and `npm run db:init`

---

## ⚠️ Required: Add DATABASE_URL to .env.local

Your `.env.local` file is missing the `DATABASE_URL`. Add this now:

### Open `.env.local` and add:

```env
# Neon PostgreSQL Database (Pooled Connection)
DATABASE_URL=postgresql://neondb_owner:npg_6RkFWN9EZwUj@ep-snowy-hill-ah73k14i-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require

# JWT Secret (required for authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important:** Use the **pooled connection** URL (the one with `-pooler` in the hostname).

---

## 🚀 Run Migration

After adding `DATABASE_URL` to `.env.local`, run:

```bash
npm run migrate
```

Or alternatively:

```bash
npm run db:init
```

---

## ✨ What the Migration Does

The migration will:

1. ✅ Create `users` table
   - id, email, password, name, role, timestamps
2. ✅ Create `sessions` table
   - id, user_id, token, expires_at, created_at

3. ✅ Create indexes for performance:
   - Index on `users.email` (for fast login lookups)
   - Index on `sessions.token` (for fast session validation)
   - Index on `sessions.user_id` (for user's sessions)
   - Index on `sessions.expires_at` (for cleanup queries)

4. ✅ Add foreign key constraints
   - `sessions.user_id` → `users.id` (with CASCADE delete)

5. ✅ Verify tables were created
   - Lists all tables in your database

---

## 📋 Expected Output

When you run `npm run migrate`, you should see:

```
🚀 Starting database migrations...

📁 Found 1 migration file(s):

📄 Running migration: 001_create_users_and_sessions.sql
   ✅ Success: 001_create_users_and_sessions.sql

✨ All migrations completed successfully!

📊 Database schema is up to date.

🔍 Verifying tables...

📋 Tables in database:
   ✓ users
   ✓ sessions

🎉 Migration complete! Your database is ready to use.
```

---

## 🧪 Test After Migration

After running the migration:

1. **Start dev server:**

   ```bash
   npm run dev
   ```

2. **Test registration:**
   - Go to http://localhost:3000
   - Click "Login" button
   - Click "Daftar sekarang"
   - Fill in form and register
   - ✅ Should work!

3. **Test login:**
   - Logout
   - Login with your credentials
   - ✅ Should work!

---

## 📊 Migration Features

### Idempotent Migrations

- Uses `CREATE TABLE IF NOT EXISTS`
- Safe to run multiple times
- Won't fail if tables already exist

### Organized Structure

```
migrations/
  001_create_users_and_sessions.sql  ← Your first migration
  002_add_new_feature.sql            ← Future migrations go here
  003_add_indexes.sql                ← Add more as needed

scripts/
  migrate.ts                         ← Migration runner
```

### Adding New Migrations

To add new migrations in the future:

1. Create new file: `migrations/002_your_migration_name.sql`
2. Add your SQL
3. Run: `npm run migrate`

The script automatically:

- Finds all `.sql` files
- Sorts them by name (001, 002, 003...)
- Runs them in order

---

## 🐛 Troubleshooting

### Error: "Database URL not found"

**Problem:** `DATABASE_URL` not in `.env.local`

**Solution:**

```bash
# Add to .env.local:
DATABASE_URL=postgresql://neondb_owner:npg_6RkFWN9EZwUj@ep-snowy-hill-ah73k14i-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Error: "Connection failed"

**Problem:** Database is sleeping or URL is wrong

**Solution:**

1. Check Neon dashboard - wake database if needed
2. Verify URL has `-pooler` in hostname
3. Ensure `?sslmode=require` is at the end

### Error: "relation already exists"

**Not a problem!** Migrations are idempotent. The tables already exist.

### Want to start fresh?

Go to Neon dashboard and drop tables:

```sql
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
```

Then run `npm run migrate` again.

---

## ✅ Quick Checklist

- [ ] Added `DATABASE_URL` to `.env.local`
- [ ] Added `JWT_SECRET` to `.env.local`
- [ ] Run `npm run migrate`
- [ ] See success message with table list
- [ ] Start dev server: `npm run dev`
- [ ] Test registration at http://localhost:3000
- [ ] Test login

---

## 🎉 Next Steps

Once migration is successful:

1. Your database tables are created ✅
2. Indexes are optimized ✅
3. Foreign keys are set up ✅
4. Ready for authentication! ✅

Then you can:

- Register new users
- Login/logout
- Store sessions
- Build your app features!

---

**Need help?** See `ENV_SETUP_GUIDE.md` for detailed environment setup.
