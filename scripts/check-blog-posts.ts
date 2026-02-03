import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config({ path: '.env.local' });

async function checkBlogPosts() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Check all blog posts
    const allPosts = await client.query(`
      SELECT id, title, slug, status, published_at, created_at
      FROM blog_posts
      ORDER BY created_at DESC
    `);

    console.log(`📊 Total posts in database: ${allPosts.rows.length}\n`);

    if (allPosts.rows.length === 0) {
      console.log('❌ No blog posts found in database!');
      console.log('   Run: npx tsx scripts/seed-blog-posts.ts\n');
      return;
    }

    console.log('📝 Posts found:\n');
    allPosts.rows.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   Status: ${post.status}`);
      console.log(`   Published: ${post.published_at || 'Not published'}`);
      console.log('');
    });

    // Check published posts only
    const publishedPosts = await client.query(`
      SELECT id, title, status, published_at
      FROM blog_posts
      WHERE status = 'published' AND published_at IS NOT NULL
    `);

    console.log(`\n✅ Published posts (visible on /blog): ${publishedPosts.rows.length}`);
    console.log(`⏳ Draft/unpublished posts: ${allPosts.rows.length - publishedPosts.rows.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

checkBlogPosts();
