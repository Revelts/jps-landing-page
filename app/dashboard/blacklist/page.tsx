/**
 * Dashboard Blacklist Page
 * Manage blacklist entries with API integration
 */

import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { BlacklistManager } from './components/BlacklistManager';

export const metadata: Metadata = {
  title: 'Blacklist Management - Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardBlacklistPage() {
  return <BlacklistManager />;
}
