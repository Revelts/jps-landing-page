/**
 * Dashboard Header Component
 * Top navigation bar with user info and logout
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AuthUser } from '@/lib/auth-middleware';
import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
  user: AuthUser;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <span className="text-lg font-bold gradient-text hidden sm:block">
            Dashboard
          </span>
        </Link>

        {/* User Info & Actions */}
        <div className="flex items-center space-x-4">
          {/* User Info */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-text-primary">
                {user.name}
              </div>
              <div className="text-xs text-text-tertiary">
                {user.email}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors duration-200 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging out...
              </span>
            ) : (
              'Logout'
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
