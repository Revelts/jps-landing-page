/**
 * Database Migration Script
 * Run migrations from the migrations folder
 * Uses standard 'pg' package for raw SQL execution
 */
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Get database URL
const getDatabaseUrl = () => {
  const databaseUrl = 
    process.env.DATABASE_URL || 
    process.env.POSTGRES_URL || 
    process.env.POSTGRES_PRISMA_URL;
  
  if (!databaseUrl) {
    throw new Error(
      '❌ Database URL not found! Please set DATABASE_URL in your .env.local file'
    );
  }
  
  return databaseUrl;
};

async function runMigrations() {
  console.log('🚀 Starting database migrations...\n');

  // Create PostgreSQL client
  const client = new Client({
    connectionString: getDatabaseUrl(),
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    // Connect to database
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected!\n');

    // Get migrations directory
    const migrationsDir = path.join(process.cwd(), 'migrations');
    
    if (!fs.existsSync(migrationsDir)) {
      console.error('❌ Migrations directory not found!');
      process.exit(1);
    }

    // Read all migration files
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort(); // Sort to ensure order

    if (files.length === 0) {
      console.log('⚠️  No migration files found.');
      await client.end();
      process.exit(0);
    }

    console.log(`📁 Found ${files.length} migration file(s):\n`);

    // Run each migration
    for (const file of files) {
      console.log(`📄 Running migration: ${file}`);
      
      const filePath = path.join(migrationsDir, file);
      const migrationSQL = fs.readFileSync(filePath, 'utf-8');

      try {
        // Execute the entire migration file as one query
        // PostgreSQL can handle multiple statements in a single query
        await client.query(migrationSQL);
        console.log(`   ✅ Success: ${file}\n`);
      } catch (error: any) {
        console.error(`   ❌ Failed: ${file}`);
        console.error(`   Error: ${error.message}\n`);
        throw error;
      }
    }

    console.log('✨ All migrations completed successfully!\n');
    console.log('📊 Database schema is up to date.\n');
    
    // Verify tables exist
    console.log('🔍 Verifying tables...');
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);
    
    console.log('\n📋 Tables in database:');
    if (result.rows.length === 0) {
      console.log('   ⚠️  No tables found');
    } else {
      result.rows.forEach((table: any) => {
        console.log(`   ✓ ${table.table_name}`);
      });
    }

    console.log('\n🎉 Migration complete! Your database is ready to use.');
    
    // Close connection
    await client.end();
    process.exit(0);

  } catch (error: any) {
    console.error('\n❌ Migration failed!');
    console.error(`Error: ${error.message}`);
    
    // Try to close connection
    try {
      await client.end();
    } catch (e) {
      // Ignore connection close errors
    }
    
    process.exit(1);
  }
}

// Run migrations
runMigrations();
