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
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
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

    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}
