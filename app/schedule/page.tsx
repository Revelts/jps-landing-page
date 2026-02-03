/**
 * Weekly Schedule Page
 * Display weekly event schedule with venues and DJs
 * SEO Optimized: Server-side rendering with ISR for better indexing
 */

import { Metadata } from 'next';
import { WeeklySchedule } from './components/WeeklySchedule';
import { generateMetadata } from '@/lib/metadata';

/**
 * SEO Optimization: Use ISR for fresh content with caching
 * Revalidate every 30 minutes to show updated schedule
 */
export const revalidate = 1800; // 30 minutes

export const metadata: Metadata = generateMetadata({
  title: 'Jadwal Party Jakarta Minggu Ini - Schedule Nightclub & Event 2026',
  description: 'Jadwal lengkap party Jakarta minggu ini! Update real-time event nightclub di SCBD, Kemang, PIK, Senopati. Guest DJ, genres musik, dan venue info. Cek jadwal sekarang!',
  keywords: 'jadwal party jakarta, schedule nightclub jakarta, jadwal club jakarta, event minggu ini jakarta, party schedule, jadwal DJ jakarta, nightlife schedule jakarta, weekly party jakarta',
  canonical: '/schedule',
});

export default function SchedulePage() {
  return <WeeklySchedule />;
}
