import { Metadata } from 'next';
import BlogList from './components/BlogList';
import { generateBlogMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateBlogMetadata({
  title: 'Blog - Jakarta Party Scene',
  description: 'Latest stories, insights, and updates from Jakarta Party Scene. Discover nightlife tips, event reviews, club guides, and party culture in Jakarta.',
  tags: ['jakarta party blog', 'nightlife blog jakarta', 'club reviews jakarta', 'party tips jakarta', 'nightlife guide jakarta'],
});

/**
 * SEO Optimization: Use ISR instead of force-dynamic
 * Reduced revalidate time for faster content updates
 */
export const revalidate = 300; // Revalidate every 5 minutes (was 30 minutes)

export default function BlogPage() {
  return <BlogList />;
}
