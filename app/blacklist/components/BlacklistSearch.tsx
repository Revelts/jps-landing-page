/**
 * BlacklistSearch Component
 * Single Responsibility: Handle search input with debouncing and pagination
 * Client Component for interactivity
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { BlacklistUser } from '../types/blacklist';
import { filterBlacklistUsers } from '../utils/filterBlacklist';
import { BlacklistTable } from './BlacklistTable';
import { EmptyState } from './EmptyState';
import { Pagination } from './Pagination';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';

interface BlacklistSearchProps {
  initialUsers: BlacklistUser[];
}

const ITEMS_PER_PAGE = 5;

export function BlacklistSearch({ initialUsers }: BlacklistSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [searchBy, setSearchBy] = useState<'all' | 'phone' | 'instagram'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  // Filter users when debounced query changes
  useEffect(() => {
    const filtered = filterBlacklistUsers(initialUsers, debouncedQuery, searchBy);
    setFilteredUsers(filtered);
    // Reset to page 1 when search changes
    setCurrentPage(1);
  }, [debouncedQuery, searchBy, initialUsers]);

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  // Handle search by change
  const handleSearchByChange = useCallback((value: 'all' | 'phone' | 'instagram') => {
    setSearchBy(value);
  }, []);

  // Clear search
  const handleClearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    setCurrentPage(1);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Search Card */}
      <Card>
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
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
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Cari nomor HP atau Instagram username..."
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-base"
              aria-label="Search blacklist"
            />
            {query && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Text size="sm" color="muted" className="flex-shrink-0">
              Filter:
            </Text>
            <div className="flex space-x-2">
              <button
                onClick={() => handleSearchByChange('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  searchBy === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => handleSearchByChange('phone')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  searchBy === 'phone'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Phone
              </button>
              <button
                onClick={() => handleSearchByChange('instagram')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  searchBy === 'instagram'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Instagram
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <Text size="sm" color="secondary">
              {filteredUsers.length} dari {initialUsers.length} pengguna
              {debouncedQuery && ` untuk "${debouncedQuery}"`}
            </Text>
            {debouncedQuery && (
              <button
                onClick={handleClearSearch}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Results */}
      {filteredUsers.length > 0 ? (
        <>
          <BlacklistTable users={paginatedUsers} />
          
          {/* Pagination */}
          <Card className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={filteredUsers.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </Card>
        </>
      ) : initialUsers.length === 0 ? (
        <EmptyState type="no-data" />
      ) : (
        <EmptyState type="no-results" query={debouncedQuery} />
      )}
    </div>
  );
}
