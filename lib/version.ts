/**
 * Version Management
 * Single Responsibility: Handle app version checking and cache clearing
 */

// Generate version from build time
export const APP_VERSION = process.env.NEXT_PUBLIC_BUILD_ID || Date.now().toString();

/**
 * Check if app version has changed
 * @returns boolean - true if version changed
 */
export function hasVersionChanged(): boolean {
  if (typeof window === 'undefined') return false;
  
  const storedVersion = localStorage.getItem('app_version');
  return storedVersion !== null && storedVersion !== APP_VERSION;
}

/**
 * Store current app version
 */
export function storeVersion(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('app_version', APP_VERSION);
}

/**
 * Clear all cache and reload
 */
export async function clearCacheAndReload(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  try {
    // Clear localStorage except important data
    const keysToKeep = ['user_preferences']; // Add keys you want to keep
    const allKeys = Object.keys(localStorage);
    allKeys.forEach((key) => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear service worker cache if exists
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }
    
    // Clear browser cache
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    }
    
    // Store new version
    storeVersion();
    
    // Hard reload
    window.location.reload();
  } catch (error) {
    console.error('Error clearing cache:', error);
    // Fallback: just reload
    window.location.reload();
  }
}

/**
 * Get version info for debugging
 */
export function getVersionInfo() {
  return {
    current: APP_VERSION,
    stored: typeof window !== 'undefined' ? localStorage.getItem('app_version') : null,
    hasChanged: hasVersionChanged(),
  };
}
