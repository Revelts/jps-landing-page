/**
 * Dashboard Layout
 * Protected layout for authenticated users
 * Simple page layout without sidebar
 */

import { redirect } from 'next/navigation';
import { authenticateUser } from '@/lib/auth-middleware';

// Force dynamic rendering (uses cookies)
export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication
  const auth = await authenticateUser();

  if (!auth.success || !auth.user) {
    redirect('/login?redirect=/dashboard');
  }

  return <>{children}</>;
}
