/**
 * Blacklist Filter Utility
 * Single Responsibility: Handle search and filter logic
 * Pure functions, no side effects
 */

import { BlacklistUser, BlacklistSearchResult } from '../types/blacklist';

/**
 * Normalize search query
 * @param query - Raw search input
 * @returns Normalized query (trimmed, lowercase)
 */
export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

/**
 * Check if phone number matches query
 * @param phone - Phone number to check
 * @param query - Normalized query
 * @returns boolean
 */
export function matchesPhone(phone: string | undefined, query: string): boolean {
  if (!phone || !query) return false;
  return phone.toLowerCase().includes(query);
}

/**
 * Check if Instagram username matches query
 * @param instagram - Instagram username to check
 * @param query - Normalized query
 * @returns boolean
 */
export function matchesInstagram(
  instagram: string | undefined,
  query: string
): boolean {
  if (!instagram || !query) return false;
  // Remove @ symbol if present for better matching
  const cleanInstagram = instagram.replace('@', '').toLowerCase();
  const cleanQuery = query.replace('@', '');
  return cleanInstagram.includes(cleanQuery);
}

/**
 * Check if name matches query
 * @param name - Name to check
 * @param query - Normalized query
 * @returns boolean
 */
export function matchesName(name: string | undefined, query: string): boolean {
  if (!name || !query) return false;
  return name.toLowerCase().includes(query);
}

/**
 * Filter blacklist users by search query
 * @param users - All blacklist users
 * @param query - Search query
 * @param searchBy - Field to search by
 * @returns Filtered users
 */
export function filterBlacklistUsers(
  users: BlacklistUser[],
  query: string,
  searchBy: 'phone' | 'instagram' | 'all' = 'all'
): BlacklistUser[] {
  // If query is empty, return all users
  if (!query || query.trim() === '') {
    return users;
  }

  const normalizedQuery = normalizeQuery(query);

  return users.filter((user) => {
    switch (searchBy) {
      case 'phone':
        return matchesPhone(user.phone, normalizedQuery);
      
      case 'instagram':
        return matchesInstagram(user.instagram, normalizedQuery);
      
      case 'all':
      default:
        return (
          matchesPhone(user.phone, normalizedQuery) ||
          matchesInstagram(user.instagram, normalizedQuery) ||
          matchesName(user.name, normalizedQuery)
        );
    }
  });
}

/**
 * Search blacklist users and return result with metadata
 * @param users - All blacklist users
 * @param query - Search query
 * @param searchBy - Field to search by
 * @returns SearchResult with users and metadata
 */
export function searchBlacklistUsers(
  users: BlacklistUser[],
  query: string,
  searchBy: 'phone' | 'instagram' | 'all' = 'all'
): BlacklistSearchResult {
  const filteredUsers = filterBlacklistUsers(users, query, searchBy);

  return {
    users: filteredUsers,
    total: filteredUsers.length,
    query: query.trim(),
  };
}

/**
 * Sort blacklist users by date (newest first)
 * @param users - Users to sort
 * @returns Sorted users
 */
export function sortByNewest(users: BlacklistUser[]): BlacklistUser[] {
  return [...users].sort((a, b) => {
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/**
 * Sort blacklist users by date (oldest first)
 * @param users - Users to sort
 * @returns Sorted users
 */
export function sortByOldest(users: BlacklistUser[]): BlacklistUser[] {
  return [...users].sort((a, b) => {
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}
