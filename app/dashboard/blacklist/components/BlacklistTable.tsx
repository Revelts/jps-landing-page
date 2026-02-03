/**
 * Blacklist Table Component
 * Display blacklist entries in a table
 */

'use client';

import { Text } from '@/components/ui/Text';
import { BlacklistEntry } from './BlacklistManager';

interface BlacklistTableProps {
  entries: BlacklistEntry[];
  onDelete: (id: number) => void;
}

export function BlacklistTable({ entries, onDelete }: BlacklistTableProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-text-tertiary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <Text size="lg" color="secondary">
          No blacklist entries found
        </Text>
        <Text size="sm" color="secondary" className="mt-2 text-text-tertiary">
          Try adjusting your search or add a new entry
        </Text>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Name</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Phone</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Instagram</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Reason</th>
            <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary">Date</th>
            <th className="text-right py-4 px-6 text-sm font-semibold text-text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-4 px-6">
                <Text size="sm" className="text-text-primary font-medium">
                  {entry.name || '-'}
                </Text>
              </td>
              <td className="py-4 px-6">
                <Text size="sm" className="text-text-primary font-mono">
                  {entry.phone || '-'}
                </Text>
              </td>
              <td className="py-4 px-6">
                <Text size="sm" className="text-text-primary">
                  {entry.instagram || '-'}
                </Text>
              </td>
              <td className="py-4 px-6">
                <Text size="sm" className="text-text-secondary">
                  {entry.reason}
                </Text>
              </td>
              <td className="py-4 px-6">
                <Text size="sm" className="text-text-tertiary">
                  {new Date(entry.created_at).toLocaleDateString('id-ID')}
                </Text>
              </td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => onDelete(entry.id)}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-all border border-red-500/30 hover:border-red-500/50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
