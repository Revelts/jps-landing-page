import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config({ path: '.env.local' });

async function checkID1() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    
    // Check if there's a post with ID 1
    const result = await client.query(`
      SELECT * FROM blog_posts WHERE id = 1
    `);

    if (result.rows.length > 0) {
      console.log('⚠️  Found post with ID 1 (old test post):');
      console.log(result.rows[0]);
      console.log('\n💡 This is an old test post. Should be deleted.');
      
      // Delete it
      await client.query('DELETE FROM blog_posts WHERE id = 1');
      console.log('✅ Deleted old post with ID 1');
    } else {
      console.log('✅ No post with ID 1 found (good!)');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

checkID1();
