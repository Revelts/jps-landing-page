/**
 * Blacklist Manager Component
 * Main component for managing blacklist entries
 */

'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
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
    <div className="min-h-screen relative overflow-hidden py-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-gradient-to-tr from-red-900/10 via-transparent to-secondary/10 animate-gradient-shift bg-[length:200%_200%]" />
      </div>
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <Container className="relative z-10">
        <Section className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <div>
              <Heading level={1} className="text-3xl sm:text-4xl gradient-text mb-2">
                Blacklist Management
              </Heading>
              <Text size="base" color="secondary">
                Manage blacklisted users and entries
              </Text>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white font-medium rounded-lg hover:shadow-glow-sm transition-all duration-200"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Entry
              </span>
            </button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="pt-2">
              <BlacklistStats stats={stats} />
            </div>
          )}

          {/* Search */}
          <Card padding="lg">
            <BlacklistSearch onSearch={handleSearch} />
          </Card>

          {/* Table */}
          <Card>
            {error ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-4 py-2 bg-red-500/20 text-red-300 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            ) : loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                <Text size="sm" color="secondary" className="mt-4">
                  Loading blacklist entries...
                </Text>
              </div>
            ) : (
              <BlacklistTable entries={entries} onDelete={handleDelete} />
            )}
          </Card>

          {/* Add Modal */}
          {isAddModalOpen && (
            <AddBlacklistModal
              onClose={() => setIsAddModalOpen(false)}
              onSuccess={handleAddSuccess}
            />
          )}
        </Section>
      </Container>
    </div>
  );
}
