/**
 * BlacklistTable Component
 * Single Responsibility: Display blacklist users in a table format
 * Responsive: Card layout on mobile, table on desktop
 */

'use client';

import { BlacklistUser } from '../types/blacklist';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

interface BlacklistTableProps {
  users: BlacklistUser[];
}

export function BlacklistTable({ users }: BlacklistTableProps) {
  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      {/* Mobile View - Card Layout */}
      <div className="block lg:hidden space-y-4">
        {users.map((user) => (
          <Card key={user.id} variant="elevated" className="p-5 border border-red-500/20 hover:border-red-500/40 transition-all duration-500">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Text size="base" className="font-semibold text-text-primary">
                    {user.name || 'No Name'}
                  </Text>
                  <Text size="sm" color="muted" className="text-text-muted">
                    ID: {user.id}
                  </Text>
                </div>
                <div className="flex-shrink-0 ml-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
                    Blacklisted
                  </span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-secondary/20">
                <div>
                  <Text size="xs" color="muted" className="mb-1 text-text-muted">
                    Phone
                  </Text>
                  <Text size="sm" className="font-medium text-text-primary">
                    {user.phone || '-'}
                  </Text>
                </div>
                <div>
                  <Text size="xs" color="muted" className="mb-1 text-text-muted">
                    Instagram
                  </Text>
                  <Text size="sm" className="font-medium text-secondary">
                    {user.instagram || '-'}
                  </Text>
                </div>
              </div>

              {/* Reason */}
              {user.reason && (
                <div className="pt-2 border-t border-secondary/20">
                  <Text size="xs" color="muted" className="mb-1 text-text-muted">
                    Reason
                  </Text>
                  <Text size="sm" color="secondary" className="leading-relaxed text-text-secondary">
                    {user.reason}
                  </Text>
                </div>
              )}

              {/* Date */}
              <div className="pt-2">
                <Text size="xs" color="muted" className="text-text-tertiary">
                  Added: {formatDate(user.createdAt)}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop View - Table Layout */}
      <div className="hidden lg:block">
        <Card variant="elevated" className="overflow-hidden p-0 border-2 border-secondary/20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary/20">
              <thead className="bg-surface/50 backdrop-blur-sm">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider"
                  >
                    Name / ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider"
                  >
                    Instagram
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider"
                  >
                    Reason
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider"
                  >
                    Date Added
                  </th>
                </tr>
              </thead>
              <tbody className="bg-surface/30 backdrop-blur-sm divide-y divide-secondary/20">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-secondary/10 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <Text size="sm" className="font-medium text-text-primary">
                          {user.name || 'No Name'}
                        </Text>
                        <Text size="xs" color="muted" className="text-text-muted">
                          {user.id}
                        </Text>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Text size="sm" className="font-mono text-text-primary">
                        {user.phone || '-'}
                      </Text>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Text size="sm" className="text-secondary font-medium">
                        {user.instagram || '-'}
                      </Text>
                    </td>
                    <td className="px-6 py-4">
                      <Text size="sm" color="secondary" className="line-clamp-2 text-text-secondary">
                        {user.reason || '-'}
                      </Text>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Text size="sm" color="muted" className="text-text-tertiary">
                        {formatDate(user.createdAt)}
                      </Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
