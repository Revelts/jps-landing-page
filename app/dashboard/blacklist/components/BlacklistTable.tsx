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
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-secondary/20 bg-secondary/5">
            <th className="text-left py-5 px-6 text-xs font-bold text-text-primary tracking-wider uppercase">Name</th>
            <th className="text-left py-5 px-6 text-xs font-bold text-text-primary tracking-wider uppercase">Phone</th>
            <th className="text-left py-5 px-6 text-xs font-bold text-text-primary tracking-wider uppercase">Instagram</th>
            <th className="text-left py-5 px-6 text-xs font-bold text-text-primary tracking-wider uppercase">Reason</th>
            <th className="text-left py-5 px-6 text-xs font-bold text-text-primary tracking-wider uppercase">Date</th>
            <th className="text-right py-5 px-6 text-xs font-bold text-text-primary tracking-wider uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr 
              key={entry.id} 
              className={`border-b border-white/5 hover:bg-secondary/5 transition-all duration-200 group ${index % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
            >
              <td className="py-5 px-6">
                <Text size="sm" className="text-text-primary font-semibold group-hover:text-secondary transition-colors">
                  {entry.name || '-'}
                </Text>
              </td>
              <td className="py-5 px-6">
                <Text size="sm" className="text-text-primary font-mono tracking-wide">
                  {entry.phone || '-'}
                </Text>
              </td>
              <td className="py-5 px-6">
                <Text size="sm" className="text-text-primary">
                  {entry.instagram ? (
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      {entry.instagram}
                    </span>
                  ) : '-'}
                </Text>
              </td>
              <td className="py-5 px-6">
                <Text size="sm" className="text-text-secondary line-clamp-2">
                  {entry.reason}
                </Text>
              </td>
              <td className="py-5 px-6">
                <Text size="sm" className="text-text-tertiary font-medium">
                  {new Date(entry.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </Text>
              </td>
              <td className="py-5 px-6 text-right">
                <button
                  onClick={() => onDelete(entry.id)}
                  className="px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl text-sm font-semibold transition-all border-2 border-red-500/30 hover:border-red-500/50 hover:shadow-glow-sm inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
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
