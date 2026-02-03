import { Metadata } from 'next';
import BlogDetail from './components/BlogDetail';
import { generateBlogMetadata, generateArticleSchema } from '@/lib/metadata';
import { query } from '@/lib/db';

/**
 * SEO Optimization: Use ISR (Incremental Static Regeneration)
 * - Pre-render pages at build time
 * - Revalidate every 1 hour to show fresh content
 * - Much better for SEO than force-dynamic
 */
export const revalidate = 3600; // Revalidate every 1 hour

/**
 * Generate static params for popular blog posts
 * This pre-renders blog posts at build time for faster initial load
 * and better SEO indexing
 */
export async function generateStaticParams() {
  try {
    // Add timeout to prevent build hanging
    const result = await Promise.race([
      query(`
        SELECT slug
        FROM blog_posts
        WHERE status = 'published'
          AND published_at IS NOT NULL
        ORDER BY published_at DESC
        LIMIT 50
      `),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Query timeout')), 5000)
      ) as Promise<any>
    ]);

    console.log(`✅ [Blog] Generating ${result.rows.length} static pages`);
    
    return result.rows.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (_error) {
    console.warn('⚠️ [Blog] Could not pre-generate static pages, will generate on-demand');
    return []; // Return empty array - pages will be generated on first request
  }
}

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO with full OpenGraph support for all social media
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Use next.revalidate instead of no-store for ISR
    const response = await fetch(`${baseUrl}/api/blog/${params.slug}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      return generateBlogMetadata({
        title: 'Post Not Found',
        description: 'The blog post you are looking for could not be found.',
      });
    }

    const data = await response.json();
    const post = data.data;

    return generateBlogMetadata({
      title: post.title,
      description: post.excerpt || post.title || 'Read more on Jakarta Party Scene blog',
      image: post.featured_image,
      slug: params.slug,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      author: post.author_name || 'Jakarta Party Squad',
      tags: post.tags || undefined, // Optional: added in migration 007
      category: post.category || undefined, // Optional: added in migration 007
    });
  } catch (_error) {
    return generateBlogMetadata({
      title: 'Blog - Jakarta Party Scene',
      description: 'Read the latest stories from Jakarta Party Squad',
    });
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  // Fetch post data for structured data (with ISR caching)
  let articleSchema = null;
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog/${params.slug}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (response.ok) {
      const data = await response.json();
      const post = data.data;
      
      articleSchema = generateArticleSchema({
        title: post.title,
        description: post.excerpt || post.title,
        image: post.featured_image || 'https://jakartapartysquad.com/assets/images/header.jpg',
        datePublished: post.published_at,
        dateModified: post.updated_at,
        author: post.author_name || 'Jakarta Party Squad', // Use author_name from API
        slug: params.slug,
      });
    }
  } catch (_error) {
    // Silent fail for schema - article will still render without it
  }

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      )}
      <BlogDetail slug={params.slug} />
    </>
  );
}
