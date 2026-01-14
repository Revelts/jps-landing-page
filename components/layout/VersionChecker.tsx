/**
 * VersionChecker Component
 * Single Responsibility: Check app version and clear cache when needed
 * Runs on client-side only
 */

'use client';

import { useEffect } from 'react';
import { hasVersionChanged, clearCacheAndReload, storeVersion } from '@/lib/version';

export function VersionChecker() {
  useEffect(() => {
    // Check version on mount
    if (hasVersionChanged()) {
      console.log('New version detected! Clearing cache and reloading...');
      clearCacheAndReload();
    } else {
      // Store version if first visit
      storeVersion();
    }
  }, []);

  // This component doesn't render anything
  return null;
}
