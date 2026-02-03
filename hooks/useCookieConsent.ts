/**
 * useCookieConsent Hook
 * Check if user has accepted cookies
 */
'use client';

import { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'jps_cookie_consent';

interface CookieConsentData {
  accepted: boolean;
  version: string;
  timestamp: string;
}

export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (consent) {
        const consentData: CookieConsentData = JSON.parse(consent);
        setHasConsent(consentData.accepted);
      } else {
        setHasConsent(null); // No consent given yet
      }
    } catch (error) {
      console.error('Error reading cookie consent:', error);
      setHasConsent(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    hasConsent,
    isLoading,
    canTrack: hasConsent === true, // Only track if explicitly accepted
  };
}
