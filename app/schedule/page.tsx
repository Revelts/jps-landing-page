/**
 * Weekly Schedule Page
 * Display weekly event schedule with venues and DJs
 */

import { Metadata } from 'next';
import { WeeklySchedule } from './components/WeeklySchedule';

export const metadata: Metadata = {
  title: 'Weekly Schedule - Jakarta Party Squad',
  description: 'Check out this week\'s party schedule across Jakarta\'s hottest venues with top DJs',
  keywords: ['jakarta nightlife', 'weekly schedule', 'party calendar', 'dj schedule', 'events'],
  openGraph: {
    title: 'Weekly Schedule - Jakarta Party Squad',
    description: 'Your weekly party guide for Jakarta\'s best nightlife',
    type: 'website',
  },
};

export default function SchedulePage() {
  return <WeeklySchedule />;
}
