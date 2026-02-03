/**
 * Blog-Specific Sitemap
 * Dedicated sitemap for blog posts with more detailed metadata
 * Helps Google better understand and index blog content
 * 
 * Accessible at: https://jakartapartysquad.com/blog-sitemap.xml
 */

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 3600; // Revalidate every 1 hour

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jakartapartysquad.com';
    
    // Fetch all published blog posts with metadata
    const result = await query(`
      SELECT 
        slug,
        TO_CHAR(published_at, 'YYYY-MM-DD"T"HH24:MI:SS"+00:00"') as published_at,
        TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"+00:00"') as updated_at,
        featured_image
      FROM blog_posts
      WHERE status = 'published'
        AND published_at IS NOT NULL
      ORDER BY published_at DESC
    `);

    const posts = result.rows;

    // Generate XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${posts
    .map(
      (post: any) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updated_at || post.published_at}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${
      post.featured_image
        ? `<image:image>
      <image:loc>${post.featured_image}</image:loc>
      <image:caption>${post.slug.replace(/-/g, ' ')}</image:caption>
    </image:image>`
        : ''
    }
  </url>`
    )
    .join('')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('❌ [Blog Sitemap] Error:', error);
    
    // Return minimal valid XML on error
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jakartapartysquad.com';
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

    return new NextResponse(errorXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}
