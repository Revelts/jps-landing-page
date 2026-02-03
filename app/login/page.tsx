/**
 * Login Page
 * Authentication page with login and register forms
 */

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { authenticateUser } from '@/lib/auth-middleware';
import { LoginPageClient } from './LoginPageClient';

// Force dynamic rendering (uses cookies)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Login - Jakarta Party Squad',
  description: 'Login to access your Jakarta Party Squad dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  // Check if user is already logged in (server-side)
  const auth = await authenticateUser();
  
  if (auth.success && auth.user) {
    // User already logged in, redirect to intended destination
    const redirectPath = searchParams.redirect || '/';
    redirect(redirectPath);
  }

  return <LoginPageClient />;
}
