/**
 * RSS Feed for Blog Posts
 * Standard RSS 2.0 format for blog syndication
 * Helps with SEO and allows users to subscribe to updates
 * 
 * Accessible at: https://jakartapartysquad.com/feed.xml
 */

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 3600; // Revalidate every 1 hour

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jakartapartysquad.com';
    
    // Fetch latest 50 published blog posts with author name
    const result = await query(`
      SELECT 
        bp.id,
        bp.title,
        bp.slug,
        bp.excerpt,
        bp.content,
        bp.featured_image,
        COALESCE(u.name, 'Jakarta Party Squad') as author,
        TO_CHAR(bp.published_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as published_at,
        TO_CHAR(bp.updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE bp.status = 'published'
        AND bp.published_at IS NOT NULL
      ORDER BY bp.published_at DESC
      LIMIT 50
    `);

    const posts = result.rows;
    const latestPost = posts[0];
    const lastBuildDate = latestPost ? latestPost.published_at : new Date().toISOString();

    // Generate RSS XML
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Jakarta Party Squad Blog</title>
    <description>Latest stories, insights, and updates from Jakarta's premier nightlife community. Nightclub reviews, party tips, event coverage, and clubbing guides.</description>
    <link>${baseUrl}/blog</link>
    <language>id-ID</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <copyright>Copyright ${new Date().getFullYear()} Jakarta Party Squad</copyright>
    <managingEditor>admin@jakartapartysquad.com (Jakarta Party Squad)</managingEditor>
    <webMaster>tech@jakartapartysquad.com (JPS Tech Team)</webMaster>
    <category>Nightlife</category>
    <category>Entertainment</category>
    <category>Events</category>
    <image>
      <url>${baseUrl}/assets/images/logo_2_512.png</url>
      <title>Jakarta Party Squad</title>
      <link>${baseUrl}</link>
      <width>512</width>
      <height>512</height>
    </image>
    ${posts
      .map(
        (post: any) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <content:encoded><![CDATA[${post.content || post.excerpt || ''}]]></content:encoded>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <dc:creator><![CDATA[${post.author || 'Jakarta Party Squad'}]]></dc:creator>
      <category><![CDATA[Nightlife Jakarta]]></category>
      ${
        post.featured_image
          ? `<media:content url="${post.featured_image}" medium="image" type="image/jpeg">
        <media:title><![CDATA[${post.title}]]></media:title>
      </media:content>
      <enclosure url="${post.featured_image}" type="image/jpeg"/>`
          : ''
      }
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('❌ [RSS Feed] Error:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
