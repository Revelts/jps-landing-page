# User Roles System - Setup Complete ✅

## Overview

User role system has been implemented with 3 levels of access for blacklist data:

- **Admin**: Full access (uncensored phone & instagram)
- **Public Relation**: Limited access (last 4 digits censored)
- **Member**: Limited access (last 4 digits censored)

---

## 🎯 Features

### Data Censorship Behavior

#### Admin Role

```
Phone: 08123456789
Instagram: @jakartapartysquad
```

✅ **Full data visible**

#### Public Relation & Member Roles

```
Phone: 08123xxxx
Instagram: @jakartapartyxxxx
```

✅ **Last 4 characters censored with "xxxx"**

---

## 📁 Files Created/Modified

### New Files

1. **`migrations/004_add_user_roles.sql`**
   - Adds `user_role` enum type
   - Adds `role` column to users table
   - Sets default role to 'Member'
   - Creates index for role queries

2. **`scripts/migrate-roles.ts`**
   - Migration runner script
   - Shows current users and roles

3. **`scripts/set-user-role.ts`**
   - Script to set user roles
   - Validates role input
   - Shows before/after comparison

### Modified Files

1. **`lib/db.ts`**
   - Added user_role enum creation
   - Updated users table schema
   - Added role index

2. **`app/api/blacklist/route.ts`**
   - Added `censorData()` helper function
   - Added `censorBlacklistEntries()` function
   - Updated GET endpoint to apply censorship
   - Returns userRole in response

3. **`package.json`**
   - Added `migrate:roles` script
   - Added `set-role` script

4. **`contexts/AuthContext.tsx`**
   - Already has role field ✅

5. **`lib/auth-middleware.ts`**
   - Already includes role in AuthUser ✅

---

## 🚀 Setup Instructions

### 1. Run Migration

```bash
npm run migrate:roles
```

This will:

- Create user_role enum type
- Add role column to users table
- Set all existing users to 'Member'
- Show current users and their roles

### 2. Set Admin Role

```bash
npm run set-role <email> Admin
```

Example:

```bash
npm run set-role admin@example.com Admin
```

### 3. Set Other Roles

```bash
# Public Relation
npm run set-role pr@example.com "Public Relation"

# Member (default)
npm run set-role user@example.com Member
```

---

## 🔧 Usage Examples

### Check Current Users

```bash
npm run migrate:roles
```

Shows table of all users with their roles.

### Update Multiple Users

```bash
npm run set-role admin1@example.com Admin
npm run set-role admin2@example.com Admin
npm run set-role pr1@example.com "Public Relation"
```

---

## 📊 API Response Structure

### GET /api/blacklist Response

#### For Admin Users

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "phone": "08123456789",
      "instagram": "@johndoe",
      "reason": "Troublemaker"
    }
  ],
  "pagination": { ... },
  "userRole": "Admin"
}
```

#### For Non-Admin Users

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "phone": "08123xxxx",
      "instagram": "@johnxxxx",
      "reason": "Troublemaker"
    }
  ],
  "pagination": { ... },
  "userRole": "Member"
}
```

---

## 🔐 Security Features

1. **Database Level**
   - ENUM type ensures only valid roles
   - Index for fast role-based queries
   - Foreign key constraints maintained

2. **API Level**
   - Authentication required
   - Role checked on every request
   - Censorship applied server-side

3. **Frontend Level**
   - Role info included in API response
   - Can show role badge/indicator
   - Can conditionally show features

---

## 🧪 Testing

### Test Censorship

1. Login as Admin
   - Visit `/dashboard/blacklist`
   - Should see full phone & instagram

2. Set yourself as Member

   ```bash
   npm run set-role <your-email> Member
   ```

3. Refresh blacklist page
   - Should see censored data (xxxx)

4. Set back to Admin
   ```bash
   npm run set-role <your-email> Admin
   ```

### Test Different Roles

```bash
# Create test users (via registration)
# Then set their roles

npm run set-role test-admin@test.com Admin
npm run set-role test-pr@test.com "Public Relation"
npm run set-role test-member@test.com Member

# Login with each and check blacklist page
```

---

## 📝 Database Schema

### User Roles Enum

```sql
CREATE TYPE user_role AS ENUM ('Admin', 'Public Relation', 'Member');
```

### Users Table (role column)

```sql
ALTER TABLE users
ADD COLUMN role user_role DEFAULT 'Member';
```

### Index

```sql
CREATE INDEX idx_users_role ON users(role);
```

---

## 🎨 Frontend Enhancement (Optional)

You can add role badge in UI:

```tsx
// In dashboard header or user menu
{
  user.role === 'Admin' && (
    <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">Admin</span>
  );
}

{
  user.role === 'Public Relation' && (
    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">Public Relation</span>
  );
}
```

---

## 🔄 Future Enhancements

Possible additions:

- Role-based menu visibility
- Admin-only features (edit, delete)
- Audit log for role changes
- Bulk role assignment UI
- Role management page in dashboard

---

## ✅ Checklist

- [x] Migration created
- [x] Database schema updated
- [x] API censorship implemented
- [x] Helper scripts created
- [x] npm scripts added
- [x] Documentation written
- [ ] Run migration on production
- [ ] Set admin users on production
- [ ] Test all roles

---

## 🆘 Troubleshooting

### Migration Fails

```bash
# Check if role column already exists
# Drop and recreate if needed (careful!)

# Or just skip if already exists (migration handles this)
```

### Role Not Updating

```bash
# Verify user exists
npm run migrate:roles

# Try exact role name with quotes
npm run set-role user@example.com "Public Relation"
```

### Censorship Not Working

- Check API response includes userRole
- Verify user role in database
- Check browser console for errors
- Clear cache and hard reload

---

**Role system is ready! 🎉**
