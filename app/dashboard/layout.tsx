/**
 * Dashboard Layout
 * 
 * Protected layout - all child routes require authentication
 * Redirects to login if user is not authenticated
 */

import { redirect } from 'next/navigation';
import { authenticateUser } from '@/lib/auth-middleware';
import { ReactNode } from 'react';

// Force dynamic rendering (uses cookies)
export const dynamic = 'force-dynamic';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // Check authentication for all dashboard routes
  const auth = await authenticateUser();
  
  if (!auth.success || !auth.user) {
    // Redirect to login with current path for post-login redirect
    redirect('/login?redirect=/dashboard');
  }

  // User is authenticated, render dashboard content
  return <>{children}</>;
}
