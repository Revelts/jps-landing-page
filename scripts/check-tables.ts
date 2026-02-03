/**
 * Check Database Tables
 * Verify what tables exist in the database
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const getDatabaseUrl = () => {
  const databaseUrl = 
    process.env.DATABASE_URL || 
    process.env.POSTGRES_URL || 
    process.env.POSTGRES_PRISMA_URL;
  
  if (!databaseUrl) {
    throw new Error('❌ Database URL not found!');
  }
  
  return databaseUrl;
};

const sql = neon(getDatabaseUrl());

async function checkTables() {
  console.log('🔍 Checking database tables...\n');

  try {
    // Check all tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;

    console.log(`📊 Found ${tables.length} table(s):\n`);
    
    if (tables.length === 0) {
      console.log('⚠️  No tables found in database.\n');
    } else {
      tables.forEach((table: any) => {
        console.log(`   ✓ ${table.table_name}`);
      });
      console.log('');
    }

    // Check users table structure
    if (tables.some((t: any) => t.table_name === 'users')) {
      console.log('📋 Users table columns:');
      const userCols = await sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'users'
        ORDER BY ordinal_position
      `;
      userCols.forEach((col: any) => {
        console.log(`   - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(required)' : '(optional)'}`);
      });
      console.log('');
    }

    // Check sessions table structure
    if (tables.some((t: any) => t.table_name === 'sessions')) {
      console.log('📋 Sessions table columns:');
      const sessionCols = await sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'sessions'
        ORDER BY ordinal_position
      `;
      sessionCols.forEach((col: any) => {
        console.log(`   - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(required)' : '(optional)'}`);
      });
      console.log('');
    }

    console.log('✅ Database check complete!\n');
    process.exit(0);

  } catch (error: any) {
    console.error('❌ Error checking database:', error.message);
    process.exit(1);
  }
}

checkTables();
