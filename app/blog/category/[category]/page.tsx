/**
 * Blog Category Page
 * SEO: Create indexable pages per category
 * Example: /blog/category/nightlife, /blog/category/clubbing, etc.
 */

import { Metadata } from 'next';
import { query } from '@/lib/db';
import { generateBlogMetadata } from '@/lib/metadata';
import BlogList from '../../components/BlogList';

export const revalidate = 3600; // 1 hour ISR

interface PageProps {
  params: {
    category: string;
  };
}

// Generate static params for known categories
export async function generateStaticParams() {
  try {
    const result = await Promise.race([
      query(`
        SELECT DISTINCT LOWER(category) as category
        FROM blog_posts
        WHERE status = 'published'
          AND category IS NOT NULL
        LIMIT 20
      `),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Query timeout')), 5000)
      ) as Promise<any>
    ]);

    return result.rows.map((row: any) => ({
      category: row.category,
    }));
  } catch (_error) {
    console.warn('⚠️ [Category] Could not pre-generate pages, will generate on-demand');
    return [];
  }
}

// Generate metadata per category
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categoryName = params.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return generateBlogMetadata({
    title: `${categoryName} - Blog Jakarta Party Squad`,
    description: `Semua artikel tentang ${categoryName} di Jakarta. Tips, review, dan panduan lengkap untuk nightlife Jakarta.`,
    tags: [params.category, 'jakarta', 'nightlife', 'blog'],
  });
}

export default async function CategoryPage({ params }: PageProps) {
  // This will be handled by BlogList component with category filter
  // For now, use the standard BlogList component
  
  const categoryName = params.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          Category: {categoryName}
        </h1>
        <p className="text-text-secondary mb-8">
          Showing all posts in {categoryName}
        </p>
      </div>
      <BlogList />
    </div>
  );
}
