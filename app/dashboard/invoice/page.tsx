/**
 * Dashboard Invoice Generator Page
 * Protected invoice creator with PDF export - Admin Only
 */
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { authenticateUser } from '@/lib/auth-middleware';
import InvoicePageClient from './InvoicePageClient';

// Force dynamic rendering (uses cookies)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Invoice Generator - Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardInvoicePage() {
  // Check authentication and role
  const auth = await authenticateUser();

  if (!auth.success || !auth.user) {
    redirect('/login?redirect=/dashboard/invoice');
  }

  // Only Admin can access invoice
  if (auth.user.role !== 'Admin') {
    redirect('/dashboard?error=unauthorized');
  }

  return <InvoicePageClient />;
}
