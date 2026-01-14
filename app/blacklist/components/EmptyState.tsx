/**
 * EmptyState Component
 * Single Responsibility: Display empty or no-results state
 */

import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';

interface EmptyStateProps {
  type: 'no-data' | 'no-results';
  query?: string;
}

export function EmptyState({ type, query }: EmptyStateProps) {
  if (type === 'no-data') {
    return (
      <Card className="text-center py-12 sm:py-16">
        <div className="flex flex-col items-center space-y-4">
          {/* Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Text size="lg" className="font-semibold text-gray-900">
              Tidak Ada Data
            </Text>
            <Text size="base" color="secondary">
              Belum ada pengguna dalam daftar blacklist.
            </Text>
          </div>
        </div>
      </Card>
    );
  }

  // no-results
  return (
    <Card className="text-center py-12 sm:py-16">
      <div className="flex flex-col items-center space-y-4">
        {/* Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-50 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Text size="lg" className="font-semibold text-gray-900">
            Tidak Ditemukan
          </Text>
          <Text size="base" color="secondary">
            Pencarian &quot;{query}&quot; tidak ditemukan dalam blacklist.
          </Text>
          <Text size="sm" color="muted" className="italic">
            Coba gunakan kata kunci lain atau periksa nomor/username.
          </Text>
        </div>
      </div>
    </Card>
  );
}
