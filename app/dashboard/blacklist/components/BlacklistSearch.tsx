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
    <form onSubmit={handleSubmit} className="flex gap-3 py-2">
      <div className="flex-1 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, phone, or Instagram..."
          className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-3.5 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-lg transition-all border border-secondary/30 hover:border-secondary/50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}
