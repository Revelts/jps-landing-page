import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config({ path: '.env.local' });

async function debugBlogPosts() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Check ALL posts (even archived/draft)
    const allPosts = await client.query(`
      SELECT 
        id, 
        title, 
        slug, 
        status, 
        published_at,
        created_at
      FROM blog_posts
      ORDER BY id ASC
    `);

    console.log(`📊 Total posts in database: ${allPosts.rows.length}\n`);

    console.log('All posts (ordered by ID):');
    console.log('═'.repeat(80));
    allPosts.rows.forEach((post) => {
      console.log(`\nID: ${post.id}`);
      console.log(`Title: ${post.title}`);
      console.log(`Slug: ${post.slug}`);
      console.log(`Status: ${post.status}`);
      console.log(`Published: ${post.published_at}`);
      console.log(`Created: ${post.created_at}`);
    });
    console.log('\n' + '═'.repeat(80));

    // Now test the exact query that API uses
    console.log('\n🔍 Testing EXACT API query...\n');
    
    const apiQuery = await client.query(`
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
    `);

    console.log(`📝 Posts returned by API query: ${apiQuery.rows.length}\n`);
    
    if (apiQuery.rows.length === 0) {
      console.log('❌ No posts match the API query!');
      console.log('   Check: status = "published" AND published_at IS NOT NULL');
    } else {
      console.log('Posts that API will return:');
      apiQuery.rows.forEach((post, index) => {
        console.log(`\n${index + 1}. ${post.title}`);
        console.log(`   Slug: ${post.slug}`);
        console.log(`   Published: ${post.published_at}`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

debugBlogPosts();
