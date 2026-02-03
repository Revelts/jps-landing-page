import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { authenticateUser } from '@/lib/auth-middleware';
import BlogEditor from './components/BlogEditor';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog Editor - Admin | Jakarta Party Scene',
  description: 'Create and manage blog posts - Admin only',
};

export default async function BlogEditorPage() {
  const auth = await authenticateUser();

  // Check authentication
  if (!auth.success || !auth.user) {
    redirect('/login?redirect=/dashboard/blog');
  }

  // Check admin role
  if (auth.user.role !== 'Admin') {
    redirect('/dashboard');
  }

  return <BlogEditor user={auth.user} />;
}
