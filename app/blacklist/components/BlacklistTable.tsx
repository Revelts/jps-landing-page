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
          <Card key={user.id} className="p-5">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Text size="base" className="font-semibold text-black">
                    {user.name || 'No Name'}
                  </Text>
                  <Text size="sm" color="muted">
                    ID: {user.id}
                  </Text>
                </div>
                <div className="flex-shrink-0 ml-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-black border border-indigo-200">
                    Blacklisted
                  </span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                <div>
                  <Text size="xs" color="muted" className="mb-1">
                    Phone
                  </Text>
                  <Text size="sm" className="font-medium">
                    {user.phone || '-'}
                  </Text>
                </div>
                <div>
                  <Text size="xs" color="muted" className="mb-1">
                    Instagram
                  </Text>
                  <Text size="sm" className="font-medium">
                    {user.instagram || '-'}
                  </Text>
                </div>
              </div>

              {/* Reason */}
              {user.reason && (
                <div className="pt-2 border-t border-gray-100">
                  <Text size="xs" color="muted" className="mb-1">
                    Reason
                  </Text>
                  <Text size="sm" color="secondary" className="leading-relaxed">
                    {user.reason}
                  </Text>
                </div>
              )}

              {/* Date */}
              <div className="pt-2">
                <Text size="xs" color="muted">
                  Added: {formatDate(user.createdAt)}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop View - Table Layout */}
      <div className="hidden lg:block">
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name / ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Instagram
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Reason
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date Added
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <Text size="sm" className="font-medium text-black">
                          {user.name || 'No Name'}
                        </Text>
                        <Text size="xs" color="muted">
                          {user.id}
                        </Text>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Text size="sm" className="font-mono text-black">
                        {user.phone || '-'}
                      </Text>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Text size="sm" className="text-indigo-700 font-medium">
                        {user.instagram || '-'}
                      </Text>
                    </td>
                    <td className="px-6 py-4">
                      <Text size="sm" color="secondary" className="line-clamp-2">
                        {user.reason || '-'}
                      </Text>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Text size="sm" color="muted">
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
