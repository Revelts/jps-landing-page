/**
 * Blacklist Loading State
 * Single Responsibility: Display loading UI while page loads
 */

import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

export default function BlacklistLoading() {
  return (
    <>
      {/* Hero Skeleton */}
      <Section className="bg-gradient-to-br from-red-50 via-white to-gray-50 pt-24 sm:pt-28 md:pt-32">
        <div className="text-center space-y-5 sm:space-y-6 max-w-4xl mx-auto animate-pulse">
          <div className="inline-block h-8 w-32 bg-gray-200 rounded-full" />
          <div className="h-12 w-3/4 mx-auto bg-gray-200 rounded-lg" />
          <div className="h-6 w-full bg-gray-200 rounded-lg" />
          <div className="h-6 w-5/6 mx-auto bg-gray-200 rounded-lg" />
        </div>
      </Section>

      {/* Stats Skeleton */}
      <Section className="bg-white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="text-center">
              <div className="space-y-2">
                <div className="h-10 w-16 mx-auto bg-gray-200 rounded" />
                <div className="h-4 w-20 mx-auto bg-gray-200 rounded" />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Search Skeleton */}
      <Section>
        <div className="max-w-7xl mx-auto animate-pulse">
          <Card className="mb-6">
            <div className="h-4 w-full bg-gray-200 rounded mb-2" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </Card>

          <Card>
            <div className="space-y-4">
              <div className="h-12 w-full bg-gray-200 rounded-lg" />
              <div className="flex space-x-2">
                <div className="h-10 w-24 bg-gray-200 rounded-lg" />
                <div className="h-10 w-24 bg-gray-200 rounded-lg" />
                <div className="h-10 w-24 bg-gray-200 rounded-lg" />
              </div>
            </div>
          </Card>

          {/* Table Skeleton */}
          <div className="mt-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i}>
                <div className="space-y-3">
                  <div className="h-6 w-1/3 bg-gray-200 rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
