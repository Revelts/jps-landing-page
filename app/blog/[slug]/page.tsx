import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetail from './components/BlogDetail';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog/${params.slug}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return {
        title: 'Post Not Found - Jakarta Party Scene',
      };
    }

    const data = await response.json();
    const post = data.data;

    return {
      title: `${post.title} - Jakarta Party Scene`,
      description: post.excerpt || 'Read more on Jakarta Party Scene blog',
      openGraph: {
        title: post.title,
        description: post.excerpt || 'Read more on Jakarta Party Scene blog',
        images: post.featured_image ? [post.featured_image] : [],
        type: 'article',
        publishedTime: post.published_at,
      },
    };
  } catch (error) {
    return {
      title: 'Blog - Jakarta Party Scene',
    };
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  return <BlogDetail slug={params.slug} />;
}
