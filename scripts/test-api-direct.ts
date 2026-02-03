import * as dotenv from 'dotenv';
import { query } from '../lib/db';

dotenv.config({ path: '.env.local' });

async function testAPIQuery() {
  try {
    console.log('🔍 Testing the EXACT query used in /api/blog...\n');

    const sql = `
      SELECT 
        id,
        title,
        slug,
        excerpt,
        featured_image,
        TO_CHAR(published_at, 'YYYY-MM-DD') as published_at,
        TO_CHAR(created_at, 'YYYY-MM-DD') as created_at
      FROM blog_posts
      WHERE status = 'published'
        AND published_at IS NOT NULL
      ORDER BY published_at DESC, created_at DESC
    `;

    console.log('Running query...');
    const result = await query(sql, []);

    console.log(`\n✅ Query returned ${result.rows.length} rows\n`);

    if (result.rows.length === 0) {
      console.log('❌ No rows returned!');
    } else {
      console.log('📝 Posts found:');
      result.rows.forEach((post: any, index: number) => {
        console.log(`\n${index + 1}. ${post.title}`);
        console.log(`   ID: ${post.id}`);
        console.log(`   Slug: ${post.slug}`);
        console.log(`   Published: ${post.published_at}`);
      });
    }

    console.log('\n📊 Full result object:');
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testAPIQuery();
