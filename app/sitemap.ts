import { MetadataRoute } from 'next';
import { query } from '@/lib/db';

/**
 * Dynamic Sitemap Generator
 * Includes static pages + dynamic blog posts from database
 * This ensures Google can discover and index all blog content
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://jakartapartysquad.com';
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage - Highest Priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // High-Value Pages - SEO Priority
    {
      url: `${baseUrl}/hosting/gratis`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/schedule`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },

    // Location Pages - Local SEO
    {
      url: `${baseUrl}/nightlife-scbd`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nightlife-kemang`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/nightlife-pik`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },

    // Main Pages
    {
      url: `${baseUrl}/community`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Legal Pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Fetch dynamic blog posts from database
  let blogPosts: MetadataRoute.Sitemap = [];
  
  try {
    // Add timeout to prevent hanging during build
    const result = await Promise.race([
      query(`
        SELECT 
          slug,
          TO_CHAR(published_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as published_at,
          TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
        FROM blog_posts
        WHERE status = 'published'
          AND published_at IS NOT NULL
        ORDER BY published_at DESC
        LIMIT 1000
      `),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Query timeout')), 5000)
      ) as Promise<any>
    ]);

    blogPosts = result.rows.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8, // High priority for blog content
    }));
    
    console.log(`✅ [Sitemap] Added ${blogPosts.length} blog posts to sitemap`);
  } catch (_error) {
    console.warn('⚠️ [Sitemap] Could not fetch blog posts, continuing with static pages only');
    // Continue without blog posts if DB error - sitemap will still work
  }

  // Combine static pages and dynamic blog posts
  return [...staticPages, ...blogPosts];
}
