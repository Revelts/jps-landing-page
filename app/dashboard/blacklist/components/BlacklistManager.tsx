/**
 * Blacklist Manager Component
 * Main component for managing blacklist entries
 */

'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { BlacklistTable } from './BlacklistTable';
import { BlacklistStats } from './BlacklistStats';
import { BlacklistSearch } from './BlacklistSearch';
import { AddBlacklistModal } from './AddBlacklistModal';

export interface BlacklistEntry {
  id: number;
  name: string | null;
  phone: string | null;
  instagram: string | null;
  reason: string;
  created_at: string;
  updated_at: string;
}

export interface BlacklistStats {
  total: number;
  withPhone: number;
  withInstagram: number;
  withBoth: number;
}

export function BlacklistManager() {
  const [entries, setEntries] = useState<BlacklistEntry[]>([]);
  const [stats, setStats] = useState<BlacklistStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch blacklist entries
  const fetchEntries = async (search?: string) => {
    try {
      setLoading(true);
      setError(null);

      const url = search
        ? `/api/blacklist?search=${encodeURIComponent(search)}`
        : '/api/blacklist';

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch blacklist entries');
      }

      setEntries(data.data);
      // userRole available in data.userRole if needed for future features
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching blacklist:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/blacklist/stats');
      const data = await response.json();

      if (response.ok) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchEntries();
    fetchStats();
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchEntries(query);
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blacklist entry?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blacklist/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete entry');
      }

      // Refresh data
      await fetchEntries(searchQuery);
      await fetchStats();
    } catch (err: any) {
      alert(err.message);
      console.error('Error deleting blacklist entry:', err);
    }
  };

  // Handle add success
  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    fetchEntries(searchQuery);
    fetchStats();
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-8 sm:py-12 flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-gradient-to-tr from-red-900/10 via-transparent to-secondary/10 animate-gradient-shift bg-[length:200%_200%]" />
      </div>
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <Container className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-secondary transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back to Dashboard</span>
            </a>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
            <div>
              <Heading level={1} className="text-4xl sm:text-5xl gradient-text mb-3 tracking-wide">
                Blacklist Management
              </Heading>
              <Text size="base" color="secondary" className="text-base">
                Manage blacklisted users and entries
              </Text>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-xl hover:shadow-glow-lg transition-all duration-300 border-2 border-secondary/30 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Entry
              </span>
            </button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="mb-8">
              <BlacklistStats stats={stats} />
            </div>
          )}

          {/* Search */}
          <Card padding="lg" className="shadow-glow border-2 border-secondary/20 mb-8">
            <BlacklistSearch onSearch={handleSearch} />
          </Card>

          {/* Table */}
          <Card className="shadow-glow border-2 border-secondary/20 overflow-hidden">
            {error ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-3 px-6 py-4 bg-red-500/20 text-red-300 rounded-xl border-2 border-red-500/30">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">{error}</span>
                </div>
              </div>
            ) : loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-14 h-14 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin mb-4" />
                <Text size="base" color="secondary" className="mt-4 font-semibold">
                  Loading blacklist entries...
                </Text>
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-500/20">
                  <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <Heading level={3} className="text-2xl mb-3 gradient-text">No Entries Found</Heading>
                <Text size="base" color="secondary" className="mb-8 text-base">
                  {searchQuery ? 'No results match your search criteria.' : 'Start by adding your first blacklist entry.'}
                </Text>
                {!searchQuery && (
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-8 py-4 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-xl hover:shadow-glow-lg transition-all duration-300 border-2 border-secondary/30 hover:-translate-y-0.5"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add First Entry
                    </span>
                  </button>
                )}
              </div>
            ) : (
              <BlacklistTable entries={entries} onDelete={handleDelete} />
            )}
          </Card>

          {/* Footer */}
          <div className="text-center mt-10 text-xs sm:text-sm text-text-tertiary">
            <p className="flex items-center justify-center gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>Blacklist Management • Jakarta Party Squad</span>
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            </p>
          </div>

          {/* Add Modal */}
          {isAddModalOpen && (
            <AddBlacklistModal
              onClose={() => setIsAddModalOpen(false)}
              onSuccess={handleAddSuccess}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
