import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { authenticateUser } from '@/lib/auth-middleware';
import WeeklyScheduleManager from './components/WeeklyScheduleManager';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Weekly Schedule Manager - Admin | Jakarta Party Scene',
  description: 'Manage weekly venue schedule - Admin only',
};

export default async function WeeklyScheduleAdminPage() {
  const auth = await authenticateUser();

  // Check authentication
  if (!auth.success || !auth.user) {
    redirect('/login?redirect=/dashboard/weekly-schedule');
  }

  // Check admin role
  if (auth.user.role !== 'Admin') {
    redirect('/dashboard');
  }

  return <WeeklyScheduleManager user={auth.user} />;
}
