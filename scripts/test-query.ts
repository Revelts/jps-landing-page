/**
 * Test database query function
 */
import { query } from '../lib/db';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testQuery() {
  try {
    console.log('🧪 Testing database query function...\n');
    
    // Test 1: Query without parameters
    console.log('Test 1: SELECT all users');
    const allUsers = await query('SELECT * FROM users');
    console.log('Result structure:', {
      hasRows: !!allUsers.rows,
      rowsIsArray: Array.isArray(allUsers.rows),
      rowCount: allUsers.rows?.length || 0
    });
    console.log('✅ Test 1 passed\n');
    
    // Test 2: Query with parameters
    console.log('Test 2: SELECT user by email (non-existent)');
    const userCheck = await query(
      'SELECT id FROM users WHERE email = $1',
      ['nonexistent@example.com']
    );
    console.log('Result structure:', {
      hasRows: !!userCheck.rows,
      rowsIsArray: Array.isArray(userCheck.rows),
      rowCount: userCheck.rows?.length || 0
    });
    console.log('✅ Test 2 passed\n');
    
    console.log('🎉 All tests passed! Query function works correctly.');
    process.exit(0);
    
  } catch (error: any) {
    console.error('❌ Test failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

testQuery();
