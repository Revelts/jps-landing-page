/**
 * Blacklist Types
 * Single Responsibility: Define data structures for blacklist feature
 */

/**
 * Flexible blacklist user interface
 * All fields are optional except id to handle schema variations
 */
export interface BlacklistUser {
  id: string;
  name?: string;
  phone?: string;
  instagram?: string;
  reason?: string;
  createdAt?: string;
}

/**
 * Search parameters for filtering blacklist
 */
export interface BlacklistSearchParams {
  query: string;
  searchBy: 'phone' | 'instagram' | 'all';
}

/**
 * Search result with metadata
 */
export interface BlacklistSearchResult {
  users: BlacklistUser[];
  total: number;
  query: string;
}
