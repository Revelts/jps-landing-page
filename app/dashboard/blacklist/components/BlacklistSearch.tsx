/**
 * Blacklist Search Component
 * Search input for filtering blacklist entries
 */

'use client';

import { useState } from 'react';

interface BlacklistSearchProps {
  onSearch: (query: string) => void;
}

export function BlacklistSearch({ onSearch }: BlacklistSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, phone, or Instagram..."
          className="w-full pl-12 pr-12 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 transition-all font-medium"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-red-400 transition-colors p-1 hover:bg-red-500/10 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-8 py-4 bg-gradient-to-r from-secondary to-accent hover:shadow-glow-sm text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border-2 border-secondary/30"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
