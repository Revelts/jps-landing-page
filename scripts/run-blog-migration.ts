import * as dotenv from 'dotenv';
import { Client } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config({ path: '.env.local' });

async function runBlogMigration() {
  const databaseUrl = 
    process.env.DATABASE_URL || 
    process.env.POSTGRES_URL || 
    process.env.POSTGRES_PRISMA_URL;
  
  if (!databaseUrl) {
    console.error('❌ Database URL not found in .env.local');
    process.exit(1);
  }

  const client = new Client({ connectionString: databaseUrl });

  try {
    console.log('🚀 Running blog_posts migration...\n');
    
    await client.connect();
    console.log('✅ Connected to database\n');

    const migrationPath = join(process.cwd(), 'migrations', '006_create_blog_posts.sql');
    const sql = readFileSync(migrationPath, 'utf-8');

    await client.query(sql);

    console.log('✅ Blog posts table created successfully!\n');
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    process.exit(0);
  }
}

runBlogMigration();
