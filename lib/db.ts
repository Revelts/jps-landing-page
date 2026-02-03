/**
 * Database Connection
 * PostgreSQL connection using Neon Serverless
 * Optimized for Vercel Edge Functions and serverless environments
 */
import { neon } from '@neondatabase/serverless';

// Get database URL with fallback support for multiple Neon env variable names
const getDatabaseUrl = () => {
  // Priority order: DATABASE_URL (standard) → POSTGRES_URL (Vercel) → fallback
  const databaseUrl = 
    process.env.DATABASE_URL || 
    process.env.POSTGRES_URL || 
    process.env.POSTGRES_PRISMA_URL;
  
  if (!databaseUrl) {
    throw new Error(
      '❌ Database URL not found! Please set DATABASE_URL, POSTGRES_URL, or POSTGRES_PRISMA_URL in your .env.local file'
    );
  }
  
  return databaseUrl;
};

// Get SQL client (supports tagged templates)
const sql = neon(getDatabaseUrl());

// Query function compatible with existing code using parameterized queries
// For conventional queries with $1, $2 placeholders, use neon's query method
export async function query(text: string, params?: any[]) {
  try {
    // Always use sql.query() for both parameterized and non-parameterized queries
    // This ensures consistent behavior and proper TypeScript typing
    const result = await (sql as any).query(text, params || []);
    
    // Ensure we return the proper structure with rows array
    return {
      rows: result.rows || result || []
    };
  } catch (error) {
    console.error('Database query error:', error);
    console.error('Query:', text);
    console.error('Params:', params);
    throw error;
  }
}

// Alternative: Direct SQL query with tagged templates (Neon's preferred method)
// Usage: await sql`SELECT * FROM users WHERE id = ${userId}`
export { sql };

// Initialize database tables
export async function initDB() {
  try {
    // Create enum type for user roles
    await sql`
      DO $$ BEGIN
        CREATE TYPE user_role AS ENUM ('Admin', 'Public Relation', 'Member');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    // Create users table with all columns including email verification
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role user_role DEFAULT 'Member',
        email_verified BOOLEAN DEFAULT FALSE,
        verification_token VARCHAR(255),
        verification_token_expires TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Add email_verified column if table already exists without it
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
    `;
    
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255);
    `;
    
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token_expires TIMESTAMP;
    `;

    // Create indexes for users table
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_email_verified ON users(email_verified);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
    `;

    // Create sessions table
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(500) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create indexes for sessions table
    await sql`
      CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
    `;

    // Create blacklist table
    await sql`
      CREATE TABLE IF NOT EXISTS blacklist (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        phone VARCHAR(50),
        instagram VARCHAR(255),
        reason TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL
      );
    `;

    // Create indexes for blacklist table
    await sql`
      CREATE INDEX IF NOT EXISTS idx_blacklist_phone ON blacklist(phone);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_blacklist_instagram ON blacklist(instagram);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_blacklist_name ON blacklist(name);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_blacklist_created_at ON blacklist(created_at);
    `;

    console.log('✅ Database tables initialized with all columns and indexes');
    return { success: true, message: 'Database initialized successfully' };
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}
