/**
 * Cookie Consent Banner
 * GDPR-compliant cookie consent component
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'jps_cookie_consent';
const COOKIE_CONSENT_VERSION = '1.0';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const consentData = consent ? JSON.parse(consent) : null;

    // Show banner if no consent or version mismatch
    if (!consentData || consentData.version !== COOKIE_CONSENT_VERSION) {
      setShowBanner(true);
      // Delay visibility for animation
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleAccept = () => {
    // Save consent to localStorage
    const consentData = {
      accepted: true,
      version: COOKIE_CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));

    // Hide banner with animation
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const handleDecline = () => {
    // Save decline to localStorage
    const consentData = {
      accepted: false,
      version: COOKIE_CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));

    // Clear all non-essential cookies
    document.cookie.split(";").forEach((c) => {
      const cookieName = c.split("=")[0].trim();
      // Keep only essential cookies (auth)
      if (cookieName !== 'auth_token') {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      }
    });

    // Hide banner
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />

      {/* Banner Content */}
      <div className="relative bg-gradient-to-r from-bg-primary/95 via-bg-secondary/95 to-bg-primary/95 backdrop-blur-xl border-t-2 border-secondary/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon & Text */}
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center animate-glow-pulse">
                  <Cookie className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-1">
                  🍪 We Use Cookies
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                  <Link 
                    href="/privacy" 
                    className="text-secondary hover:text-accent underline transition-colors"
                  >
                    Learn more
                  </Link>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="px-6 py-2.5 text-sm font-medium text-text-secondary border-2 border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 transition-all duration-300 min-h-[44px] flex items-center justify-center"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 text-sm font-semibold text-bg-primary bg-gradient-to-r from-secondary to-accent rounded-lg hover:shadow-glow-sm transition-all duration-300 min-h-[44px] flex items-center justify-center"
              >
                Accept All
              </button>
            </div>

            {/* Close Button (Optional) */}
            <button
              onClick={handleDecline}
              className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0 p-2 text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Close cookie banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
