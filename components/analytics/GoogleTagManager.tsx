/**
 * Google Tag Manager Component
 * 
 * Handles GTM script injection for Next.js App Router
 * Includes both <head> script and <noscript> fallback
 * Respects cookie consent
 */

'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getGTMConfig, getGTMHeadScript, getGTMNoScriptUrl, initDataLayer } from '@/lib/analytics/gtm';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export function GoogleTagManager() {
  const config = getGTMConfig();
  const { canTrack, isLoading } = useCookieConsent();
  const [shouldLoad, setShouldLoad] = useState(false);

  // Initialize dataLayer only if consent is given
  useEffect(() => {
    if (config.enabled && config.gtmId && canTrack) {
      initDataLayer(config.dataLayerName);
      setShouldLoad(true);
    }
  }, [config, canTrack]);

  // Don't render if GTM is disabled, no ID provided, still loading, or no consent
  if (!config.enabled || !config.gtmId || isLoading || !canTrack) {
    return null;
  }

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      {/* GTM Script - Injected in <head> */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getGTMHeadScript(config),
        }}
      />

      {/* GTM Noscript - For users with JavaScript disabled */}
      <noscript>
        <iframe
          src={getGTMNoScriptUrl(config)}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}

/**
 * GTM Body Script (alternative approach)
 * Use this if you prefer to inject in <body> instead of <head>
 */
export function GoogleTagManagerBody() {
  const config = getGTMConfig();

  if (!config.enabled || !config.gtmId) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={getGTMNoScriptUrl(config)}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
