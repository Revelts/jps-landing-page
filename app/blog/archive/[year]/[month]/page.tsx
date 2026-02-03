/**
 * Blog Archive Page (Year/Month)
 * SEO: Create indexable archive pages
 * Example: /blog/archive/2026/02 (February 2026)
 */

import { Metadata } from 'next';
import { query } from '@/lib/db';
import { generateBlogMetadata } from '@/lib/metadata';
import BlogList from '../../../components/BlogList';

export const revalidate = 86400; // 24 hours (archives don't change often)

interface PageProps {
  params: {
    year: string;
    month: string;
  };
}

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Generate static params for last 12 months
export async function generateStaticParams() {
  try {
    const result = await Promise.race([
      query(`
        SELECT DISTINCT
          EXTRACT(YEAR FROM published_at)::text as year,
          LPAD(EXTRACT(MONTH FROM published_at)::text, 2, '0') as month
        FROM blog_posts
        WHERE status = 'published'
          AND published_at IS NOT NULL
        ORDER BY year DESC, month DESC
        LIMIT 24
      `),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Query timeout')), 5000)
      ) as Promise<any>
    ]);

    return result.rows.map((row: any) => ({
      year: row.year,
      month: row.month,
    }));
  } catch (_error) {
    console.warn('⚠️ [Archive] Could not pre-generate pages, will generate on-demand');
    return [];
  }
}

// Generate metadata per archive
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const monthIndex = parseInt(params.month, 10) - 1;
  const monthName = monthNames[monthIndex] || 'Unknown';
  const year = params.year;

  return generateBlogMetadata({
    title: `Arsip Blog ${monthName} ${year} - Jakarta Party Squad`,
    description: `Semua artikel Jakarta Party Squad dari ${monthName} ${year}. Review nightclub, tips party, event coverage, dan panduan clubbing Jakarta.`,
    tags: [`blog ${year}`, `artikel ${monthName}`, 'jakarta nightlife', 'party jakarta'],
  });
}

export default async function ArchivePage({ params }: PageProps) {
  const monthIndex = parseInt(params.month, 10) - 1;
  const monthName = monthNames[monthIndex] || 'Unknown';
  const year = params.year;

  // Get post count for this archive
  let postCount = 0;
  try {
    const result = await query(`
      SELECT COUNT(*) as count
      FROM blog_posts
      WHERE status = 'published'
        AND EXTRACT(YEAR FROM published_at) = $1
        AND EXTRACT(MONTH FROM published_at) = $2
    `, [parseInt(year), parseInt(params.month)]);
    
    postCount = parseInt(result.rows[0]?.count) || 0;
  } catch (_error) {
    // Silent fail - page will still render with count = 0
    postCount = 0;
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          Arsip: {monthName} {year}
        </h1>
        <p className="text-text-secondary mb-8">
          {postCount} artikel dari {monthName} {year}
        </p>
      </div>
      <BlogList />
    </div>
  );
}
