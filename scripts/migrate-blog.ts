import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import { query } from '../lib/db';

dotenv.config({ path: '.env.local' });

async function runBlogMigration() {
  try {
    console.log('🚀 Running blog_posts migration...\n');

    const migrationPath = join(process.cwd(), 'migrations', '006_create_blog_posts.sql');
    const sql = readFileSync(migrationPath, 'utf-8');

    await query(sql);

    console.log('✅ Blog posts table created successfully!\n');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runBlogMigration();
