/**
 * Google Tag Manager Component
 * 
 * Handles GTM script injection for Next.js App Router
 * Includes both <head> script and <noscript> fallback
 */

'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { getGTMConfig, getGTMHeadScript, getGTMNoScriptUrl, initDataLayer } from '@/lib/analytics/gtm';

export function GoogleTagManager() {
  const config = getGTMConfig();

  // Initialize dataLayer
  useEffect(() => {
    if (config.enabled && config.gtmId) {
      initDataLayer(config.dataLayerName);
    }
  }, [config]);

  // Don't render if GTM is disabled or no ID provided
  if (!config.enabled || !config.gtmId) {
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
