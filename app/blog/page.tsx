import { Metadata } from 'next';
import BlogList from './components/BlogList';

export const metadata: Metadata = {
  title: 'Blog - Jakarta Party Scene',
  description: 'Latest stories, insights, and updates from Jakarta Party Scene',
  openGraph: {
    title: 'Blog - Jakarta Party Scene',
    description: 'Latest stories, insights, and updates from Jakarta Party Scene',
  },
};

export const dynamic = 'force-dynamic';

export default function BlogPage() {
  return <BlogList />;
}
