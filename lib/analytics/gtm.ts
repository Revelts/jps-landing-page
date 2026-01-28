/**
 * Google Tag Manager Integration
 * 
 * Core GTM utilities for Next.js App Router
 * Handles dataLayer initialization and script injection
 */

import type { GTMConfig } from '@/types/analytics';

/**
 * Get GTM Configuration from Environment Variables
 * 
 * @returns GTM configuration object
 */
export function getGTMConfig(): GTMConfig {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NF8RL7T3';
  const gtmAuth = process.env.NEXT_PUBLIC_GTM_AUTH || '';
  const gtmPreview = process.env.NEXT_PUBLIC_GTM_PREVIEW || '';
  const enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false';

  return {
    gtmId,
    auth: gtmAuth || undefined,
    preview: gtmPreview || undefined,
    enabled: enabled && !!gtmId,
  };
}

/**
 * Generate GTM Script URL
 * 
 * @param config GTM configuration
 * @returns GTM script URL with optional auth and preview parameters
 */
export function getGTMScriptUrl(config: GTMConfig): string {
  const { gtmId, auth, preview } = config;
  let url = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;

  if (auth && preview) {
    url += `&gtm_auth=${auth}&gtm_preview=${preview}&gtm_cookies_win=x`;
  }

  return url;
}

/**
 * Generate GTM noscript URL
 * 
 * @param config GTM configuration
 * @returns GTM iframe URL for noscript fallback
 */
export function getGTMNoScriptUrl(config: GTMConfig): string {
  const { gtmId, auth, preview } = config;
  let url = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;

  if (auth && preview) {
    url += `&gtm_auth=${auth}&gtm_preview=${preview}&gtm_cookies_win=x`;
  }

  return url;
}

/**
 * Initialize dataLayer
 * Should be called before GTM script loads
 * 
 * @param dataLayerName Custom dataLayer name (default: 'dataLayer')
 */
export function initDataLayer(dataLayerName = 'dataLayer'): void {
  if (typeof window !== 'undefined') {
    const win = window as unknown as Record<string, unknown>;
    win[dataLayerName] = win[dataLayerName] || [];
  }
}

/**
 * Check if GTM is loaded
 * 
 * @returns true if GTM container is loaded
 */
export function isGTMLoaded(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(window as unknown as Record<string, unknown>).google_tag_manager;
}

/**
 * GTM Script Content
 * To be injected in <head>
 * 
 * @param config GTM configuration
 * @returns Script content as string
 */
export function getGTMHeadScript(config: GTMConfig): string {
  const { gtmId, dataLayerName = 'dataLayer' } = config;
  
  return `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl+'${config.auth ? `&gtm_auth=${config.auth}` : ''}${config.preview ? `&gtm_preview=${config.preview}&gtm_cookies_win=x` : ''}';f.parentNode.insertBefore(j,f);
    })(window,document,'script','${dataLayerName}','${gtmId}');
  `;
}

/**
 * Environment-based GTM ID
 * Useful for different GTM containers per environment
 */
export function getEnvironmentGTMId(): string {
  const env = process.env.NODE_ENV;
  const customEnv = process.env.NEXT_PUBLIC_APP_ENV;
  
  if (env === 'production') {
    return process.env.NEXT_PUBLIC_GTM_ID_PROD || process.env.NEXT_PUBLIC_GTM_ID || '';
  }
  
  if (customEnv === 'staging') {
    return process.env.NEXT_PUBLIC_GTM_ID_STAGING || process.env.NEXT_PUBLIC_GTM_ID || '';
  }
  
  // Development - optional separate container
  return process.env.NEXT_PUBLIC_GTM_ID_DEV || process.env.NEXT_PUBLIC_GTM_ID || '';
}

/**
 * Debug logging for GTM
 */
export function gtmDebugLog(message: string, data?: unknown): void {
  if (process.env.NEXT_PUBLIC_GTM_DEBUG === 'true') {
    console.log(`[GTM Debug] ${message}`, data || '');
  }
}
