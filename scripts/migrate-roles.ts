/**
 * Migration script for adding user roles
 * Run with: npm run migrate:roles
 */

// IMPORTANT: Load environment variables FIRST before any other imports
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Now import other modules
import { sql } from '../lib/db';
import * as fs from 'fs';
import * as path from 'path';

async function runRolesMigration() {
  console.log('🚀 Starting roles migration...\n');

  try {
    // Read migration file
    const migrationPath = path.join(process.cwd(), 'migrations', '004_add_user_roles.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Running migration: 004_add_user_roles.sql');
    
    // Split SQL commands by semicolon and filter out comments and empty lines
    const commands = migrationSQL
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    // Execute each command
    for (const command of commands) {
      if (command.trim()) {
        await sql.unsafe(command);
      }
    }

    console.log('✅ Migration completed successfully!\n');

    // Show current users and their roles
    const users = await sql`
      SELECT id, email, name, role, created_at 
      FROM users 
      ORDER BY id ASC
    `;

    console.log('📋 Current users in database:');
    console.table(users.map((user: any) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'Member',
      created_at: new Date(user.created_at).toLocaleDateString(),
    })));

    console.log('\n💡 To set a user as Admin, run:');
    console.log('   npm run set-admin <email>');
    console.log('\nExample:');
    console.log('   npm run set-admin admin@example.com\n');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run migration
runRolesMigration();
