# 🚀 Authentication System - Quick Start Guide

## ✅ What's Been Implemented

Complete authentication system with:

- 🔐 Login & Registration API
- 💾 Neon PostgreSQL Database
- 🎨 Premium Cyber-Punk Styled Modal
- 🔒 Secure JWT Token Management
- 🍪 HTTP-only Cookie Sessions
- 👤 User Menu in Header

---

## 🏃 Quick Start (3 Steps)

### Step 1: Add JWT Secret to `.env.local`

Add this line to your `/Users/leynardo/Revelt/jps/jps-landing-page/.env.local`:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-min-32-chars
```

**Generate a secure secret:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Step 2: Initialize Database

Start your dev server:

```bash
npm run dev
```

Then visit:

```
http://localhost:3000/api/auth/init
```

You should see:

```json
{
  "success": true,
  "message": "Database initialized successfully"
}
```

This creates the `users` and `sessions` tables in your Neon database.

**Note:** Using **Neon Serverless** driver (`@neondatabase/serverless`) for optimal performance on Vercel!

---

### Step 3: Test the Login System

1. **Open your website:** `http://localhost:3000`
2. **Click "Login" button** in the header (top right)
3. **Click "Daftar sekarang"** to register
4. **Fill in the form:**
   - Name: Your Name
   - Email: your@email.com
   - Password: test123 (min 6 chars)
5. **Click "Daftar"**
6. **Success!** You should see your name in the header

---

## 📁 Files Created (16 Files)

### Backend API Routes (5 files)

```
app/api/auth/
├── register/route.ts    # POST - Register new user
├── login/route.ts       # POST - Login user
├── logout/route.ts      # POST - Logout user
├── me/route.ts          # GET - Get current user
└── init/route.ts        # GET - Initialize database
```

### Database & Auth Utils (2 files)

```
lib/
├── db.ts                # PostgreSQL connection & queries
└── auth.ts              # Password hashing, JWT tokens
```

### Frontend Components (3 files)

```
contexts/
└── AuthContext.tsx      # Global auth state

components/auth/
└── LoginModal.tsx       # Login/Register modal

components/layout/
└── Header.tsx           # Updated with user menu
```

### Root Layout (1 file)

```
app/
└── layout.tsx           # Wrapped with AuthProvider
```

### Documentation (1 file)

```
AUTH_SETUP.md            # Complete setup guide
```

---

## 🎯 Features

### Authentication

- ✅ User registration with validation
- ✅ User login with email & password
- ✅ Secure logout
- ✅ Session persistence (7 days)
- ✅ Password hashing (bcrypt)
- ✅ JWT token generation
- ✅ HTTP-only cookies
- ✅ Auto-check auth on page load

### UI/UX

- ✅ Premium cyber-punk styled modal
- ✅ Glassmorphism effects
- ✅ Gradient buttons & borders
- ✅ Loading states with spinner
- ✅ Error & success messages
- ✅ Form validation feedback
- ✅ Switch between login/register
- ✅ User menu dropdown in header
- ✅ Responsive design (mobile-friendly)

### Security

- ✅ bcrypt password hashing (10 rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ HTTP-only cookies (XSS protection)
- ✅ Secure cookies in production
- ✅ SameSite cookie policy (CSRF)
- ✅ Parameterized SQL queries
- ✅ Email format validation
- ✅ Password strength requirement (min 6)
- ✅ Session cleanup on logout

---

## 🎨 UI Preview

### Login Modal

```
┌──────────────────────────────────────┐
│  X                                   │
│                                      │
│  Login                    [gradient] │
│  Masuk ke akun JPS                   │
│                                      │
│  📧 Email                            │
│  ┌────────────────────────────────┐ │
│  │ email@example.com              │ │
│  └────────────────────────────────┘ │
│                                      │
│  🔒 Password                         │
│  ┌────────────────────────────────┐ │
│  │ ••••••••                       │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │     🔓 Masuk   [gradient]      │ │
│  └────────────────────────────────┘ │
│                                      │
│  Belum punya akun? Daftar sekarang  │
│                                      │
└──────────────────────────────────────┘
```

### Header (Logged In)

```
Logo    Nightlife ▼  Partners  Gallery    🎊 Hosting Gratis    👤 John Doe ▼
                                                                 │
                                                                 ├─ ⚙️ Settings
                                                                 └─ 🚪 Logout
```

---

## 🔌 API Usage

### Register User

```typescript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'secure123',
    name: 'John Doe',
  }),
});

const data = await response.json();
// { success: true, user: { id, email, name, role } }
```

### Login User

```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'secure123',
  }),
});

const data = await response.json();
// { success: true, user: { id, email, name, role } }
```

### Get Current User

```typescript
const response = await fetch('/api/auth/me');
const data = await response.json();
// { user: { id, email, name, role } }
```

### Logout

```typescript
await fetch('/api/auth/logout', { method: 'POST' });
// { success: true }
```

---

## 💻 Using in Components

### Check Authentication Status

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export function MyComponent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return <div>{user ? <p>Welcome, {user.name}!</p> : <p>Please login</p>}</div>;
}
```

### Protected Content

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export function ProtectedContent() {
  const { user } = useAuth();

  if (!user) {
    return <div>Access denied. Please login.</div>;
  }

  return (
    <div>
      <h1>Secret Content</h1>
      <p>Only for logged-in users</p>
    </div>
  );
}
```

### Manual Login/Logout

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export function AuthButtons() {
  const { login, logout, user } = useAuth();

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login('email@test.com', 'pass123')}>Login</button>
      )}
    </div>
  );
}
```

---

## 🗄️ Database Tables

### Users

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sessions

```sql
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🛠️ Environment Variables

Required in `.env.local`:

```env
# Database (already configured)
DATABASE_URL=postgresql://...

# Add this (IMPORTANT!)
JWT_SECRET=your-secure-secret-key-min-32-characters
```

---

## ✅ Testing Checklist

- [ ] JWT_SECRET added to .env.local
- [ ] Database initialized (`/api/auth/init`)
- [ ] Dev server running (`npm run dev`)
- [ ] Login button appears in header
- [ ] Login modal opens when clicked
- [ ] Can switch to register mode
- [ ] Can register new user
- [ ] Success message shows
- [ ] Modal closes automatically
- [ ] User name appears in header
- [ ] User menu dropdown works
- [ ] Settings link works
- [ ] Logout works
- [ ] Can login again after logout
- [ ] Session persists on refresh

---

## 🚨 Common Issues

### Modal not showing

- Check browser console for errors
- Verify AuthProvider wraps app in layout.tsx
- Check LoginModal import in Header.tsx

### Database connection failed

- Verify DATABASE_URL in .env.local
- Check Neon database is accessible
- Visit /api/auth/init to create tables

### JWT errors

- Check JWT_SECRET is set in .env.local
- Should be min 32 characters
- Restart dev server after adding

### "Email already registered"

- User exists with that email
- Try login instead
- Or use different email

---

## 📊 System Flow

```
User clicks "Login" button
        ↓
LoginModal opens
        ↓
User fills form & submits
        ↓
API validates input
        ↓
Check user in database
        ↓
Hash password / verify password
        ↓
Generate JWT token
        ↓
Store session in database
        ↓
Set HTTP-only cookie
        ↓
Return user data
        ↓
AuthContext updates state
        ↓
Header shows user menu
        ↓
User is logged in!
```

---

## 🎉 You're Ready!

Your authentication system is fully set up and ready to use!

**Next Steps:**

1. Add JWT_SECRET to .env.local
2. Visit /api/auth/init
3. Test registration & login
4. Build your user-only features!

---

**Need help?** Check `AUTH_SETUP.md` for detailed documentation.

**Made with ❤️ for Jakarta Party Squad**
