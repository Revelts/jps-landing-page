/**
 * Dashboard Blacklist Page
 * Manage blacklist entries with API integration
 * PROTECTED: Requires authentication
 */

import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { redirect } from 'next/navigation';
import { authenticateUser } from '@/lib/auth-middleware';
import { BlacklistManager } from './components/BlacklistManager';

// Force dynamic rendering (uses cookies)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blacklist Management - Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardBlacklistPage() {
  // Check authentication - redirect if not logged in
  const auth = await authenticateUser();
  
  if (!auth.success || !auth.user) {
    redirect('/login?redirect=/dashboard/blacklist');
  }

  return <BlacklistManager />;
}
