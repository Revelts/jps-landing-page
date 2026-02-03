/**
 * Blog Tag Page
 * SEO: Create indexable pages per tag
 * Example: /blog/tag/jakarta, /blog/tag/scbd, etc.
 */

import { Metadata } from 'next';
import { query } from '@/lib/db';
import { generateBlogMetadata } from '@/lib/metadata';
import BlogList from '../../components/BlogList';

export const revalidate = 3600; // 1 hour ISR

interface PageProps {
  params: {
    tag: string;
  };
}

// Generate static params for popular tags
export async function generateStaticParams() {
  try {
    // Get all unique tags from blog posts with timeout
    const result = await Promise.race([
      query(`
        SELECT DISTINCT UNNEST(tags) as tag
        FROM blog_posts
        WHERE status = 'published'
          AND tags IS NOT NULL
        LIMIT 50
      `),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Query timeout')), 5000)
      ) as Promise<any>
    ]);

    return result.rows.map((row: any) => ({
      tag: row.tag.toLowerCase().replace(/\s+/g, '-'),
    }));
  } catch (_error) {
    console.warn('⚠️ [Tag] Could not pre-generate pages, will generate on-demand');
    return [];
  }
}

// Generate metadata per tag
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tagName = params.tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return generateBlogMetadata({
    title: `Tag: ${tagName} - Jakarta Party Squad Blog`,
    description: `Artikel dengan tag ${tagName}. Temukan tips, review, dan panduan nightlife Jakarta seputar ${tagName}.`,
    tags: [params.tag, 'jakarta nightlife', 'party jakarta'],
  });
}

export default async function TagPage({ params }: PageProps) {
  const tagName = params.tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          Tag: {tagName}
        </h1>
        <p className="text-text-secondary mb-8">
          Showing all posts tagged with {tagName}
        </p>
      </div>
      <BlogList />
    </div>
  );
}
