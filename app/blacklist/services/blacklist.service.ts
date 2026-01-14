/**
 * Blacklist Data Service
 * Single Responsibility: Handle data access for blacklist users
 * Serverless-compatible, Vercel-ready
 */

import { BlacklistUser } from '../types/blacklist';
import blacklistData from '@/data/blacklist.json';

/**
 * Get all blacklist users
 * Uses static import for serverless compatibility
 * @returns Promise<BlacklistUser[]>
 */
export async function getAllBlacklistUsers(): Promise<BlacklistUser[]> {
  // Simulate async operation (in real scenario, this could be file read or API call)
  return Promise.resolve(blacklistData as BlacklistUser[]);
}

/**
 * Get blacklist user by ID
 * @param id - User ID
 * @returns Promise<BlacklistUser | null>
 */
export async function getBlacklistUserById(
  id: string
): Promise<BlacklistUser | null> {
  const users = await getAllBlacklistUsers();
  return users.find((user) => user.id === id) || null;
}

/**
 * Get total count of blacklisted users
 * @returns Promise<number>
 */
export async function getBlacklistCount(): Promise<number> {
  const users = await getAllBlacklistUsers();
  return users.length;
}

/**
 * Validate blacklist data structure
 * @param data - Raw data to validate
 * @returns boolean
 */
export function isValidBlacklistUser(data: any): data is BlacklistUser {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'string' &&
    data.id.length > 0
  );
}

/**
 * Get blacklist statistics
 * @returns Promise<{ total: number; withPhone: number; withInstagram: number }>
 */
export async function getBlacklistStats() {
  const users = await getAllBlacklistUsers();

  return {
    total: users.length,
    withPhone: users.filter((u) => u.phone).length,
    withInstagram: users.filter((u) => u.instagram).length,
    withBoth: users.filter((u) => u.phone && u.instagram).length,
  };
}
