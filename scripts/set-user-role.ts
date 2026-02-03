/**
 * Script to set user role
 * Usage: npm run set-role <email> <role>
 * Example: npm run set-role admin@example.com Admin
 */

// IMPORTANT: Load environment variables FIRST before any other imports
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Now import other modules
import { sql } from '../lib/db';

const VALID_ROLES = ['Admin', 'Public Relation', 'Member'];

async function setUserRole() {
  const email = process.argv[2];
  const role = process.argv[3];

  if (!email || !role) {
    console.error('❌ Error: Email and role are required');
    console.log('\nUsage:');
    console.log('  npm run set-role <email> <role>');
    console.log('\nValid roles:', VALID_ROLES.join(', '));
    console.log('\nExamples:');
    console.log('  npm run set-role admin@example.com Admin');
    console.log('  npm run set-role pr@example.com "Public Relation"');
    console.log('  npm run set-role user@example.com Member\n');
    process.exit(1);
  }

  if (!VALID_ROLES.includes(role)) {
    console.error(`❌ Error: Invalid role "${role}"`);
    console.log('Valid roles:', VALID_ROLES.join(', '));
    process.exit(1);
  }

  try {
    console.log(`🔄 Setting role for ${email} to ${role}...\n`);

    // Check if user exists
    const existingUser = await sql`
      SELECT id, email, name, role FROM users WHERE email = ${email}
    `;

    if (existingUser.length === 0) {
      console.error(`❌ Error: User with email "${email}" not found`);
      process.exit(1);
    }

    // Update user role
    const result = await sql`
      UPDATE users 
      SET role = ${role}::user_role
      WHERE email = ${email}
      RETURNING id, email, name, role
    `;

    console.log('✅ User role updated successfully!\n');
    console.log('User details:');
    console.table([{
      id: result[0].id,
      email: result[0].email,
      name: result[0].name,
      previous_role: existingUser[0].role || 'Member',
      new_role: result[0].role,
    }]);

    console.log('\n💡 Role permissions:');
    console.log('  • Admin: Full access to all data (phone & instagram uncensored)');
    console.log('  • Public Relation: Limited access (last 4 digits censored)');
    console.log('  • Member: Limited access (last 4 digits censored)\n');

  } catch (error: any) {
    console.error('❌ Error setting user role:', error.message);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run script
setUserRole();
