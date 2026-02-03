/**
 * Dashboard Home Page
 * Overview page for authenticated users
 * PROTECTED: Requires authentication
 */

import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { authenticateUser } from '@/lib/auth-middleware';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';

// Force dynamic rendering (uses cookies)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard - Jakarta Party Squad',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  // Check authentication - redirect if not logged in
  const auth = await authenticateUser();
  
  if (!auth.success || !auth.user) {
    redirect('/login?redirect=/dashboard');
  }
  
  // Get user role for rendering
  const userRole = auth.user.role;
  const hasError = searchParams.error === 'unauthorized';
  return (
    <div className="min-h-screen relative overflow-hidden py-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-accent/5 animate-gradient-shift bg-[length:200%_200%]" />
      </div>
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <Container className="relative z-10">
        <Section className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <Heading level={1} className="text-4xl sm:text-5xl mb-3 gradient-text">
              Dashboard
            </Heading>
            <Text size="lg" color="secondary">
              Manage blacklist and invoices for Jakarta Party Squad
            </Text>
          </div>

          {/* Error Message */}
          {hasError && (
            <Card className="bg-red-900/20 border-2 border-red-500/30 max-w-4xl mx-auto">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <Text size="sm" className="font-semibold text-red-300 mb-1">
                    Access Denied
                  </Text>
                  <Text size="sm" color="secondary" className="text-red-200/80">
                    You don&apos;t have permission to access that page. Only Admin users can access the Invoice Generator.
                  </Text>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Blacklist Card */}
            <Link href="/dashboard/blacklist">
              <Card className="group hover:shadow-glow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-secondary/30">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                    <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Heading level={3} className="text-xl mb-2 text-text-primary group-hover:text-secondary transition-colors">
                      Blacklist Management
                    </Heading>
                    <Text size="sm" color="secondary" className="text-text-tertiary">
                      View, search, and manage blacklisted users. Add new entries and update existing records.
                    </Text>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Invoice Card - Only for Admin */}
            {userRole === 'Admin' && (
              <Link href="/dashboard/invoice">
                <Card className="group hover:shadow-glow-purple-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-accent/30">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                      <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Heading level={3} className="text-xl mb-2 text-text-primary group-hover:text-accent transition-colors">
                        Invoice Generator
                      </Heading>
                      <Text size="sm" color="secondary" className="text-text-tertiary">
                        Generate professional invoices for events and services. Download PDF invoices instantly.
                      </Text>
                    </div>
                  </div>
                </Card>
              </Link>
            )}
          </div>

          {/* Info Banner */}
          <Card className="bg-blue-900/20 border-2 border-blue-500/30 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <Text size="sm" className="font-semibold text-blue-300 mb-1">
                  Protected Area
                </Text>
                <Text size="sm" color="secondary" className="text-blue-200/80">
                  This dashboard is only accessible to authenticated users. All data is confidential and should be handled with care.
                </Text>
              </div>
            </div>
          </Card>
        </Section>
      </Container>
    </div>
  );
}
