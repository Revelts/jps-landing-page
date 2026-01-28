/**
 * DataLayer Utilities
 * 
 * Helper functions to push events to GTM dataLayer
 * Type-safe, scalable, and production-ready
 */

import type {
  DataLayerEvent,
  PageViewEvent,
  ClickEvent,
  FormStartEvent,
  FormSubmitEvent,
  SocialClickEvent,
  NavigationClickEvent,
  ConversionEvent,
  SearchEvent,
  ErrorEvent,
  CustomEvent,
} from '@/types/analytics';
import { gtmDebugLog } from './gtm';

/**
 * Push event to dataLayer
 * Core function used by all event trackers
 * 
 * @param event DataLayer event object
 */
export function pushToDataLayer(event: DataLayerEvent): void {
  if (typeof window === 'undefined') {
    // SSR - skip tracking
    return;
  }

  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  // Add timestamp if not provided
  const eventWithTimestamp = {
    ...event,
    timestamp: event.timestamp || Date.now(),
  };

  window.dataLayer.push(eventWithTimestamp);
  
  gtmDebugLog('Event pushed to dataLayer', eventWithTimestamp);
}

/**
 * Track Page View
 * Should be called on route changes (SPA navigation)
 * 
 * @param data Page view data
 */
export function trackPageView(data: Omit<PageViewEvent, 'event'>): void {
  pushToDataLayer({
    event: 'page_view',
    ...data,
  });
}

/**
 * Track Button Click
 * 
 * @param data Click event data
 */
export function trackClick(data: Omit<ClickEvent, 'event'>): void {
  pushToDataLayer({
    event: data.element_type === 'link' ? 'link_click' : 'button_click',
    ...data,
  });
}

/**
 * Track Form Start
 * Triggered when user interacts with form
 * 
 * @param data Form start data
 */
export function trackFormStart(data: Omit<FormStartEvent, 'event'>): void {
  pushToDataLayer({
    event: 'form_start',
    ...data,
  });
}

/**
 * Track Form Submit
 * Triggered on form submission
 * 
 * @param data Form submit data
 */
export function trackFormSubmit(data: Omit<FormSubmitEvent, 'event'>): void {
  pushToDataLayer({
    event: 'form_submit',
    ...data,
  });
}

/**
 * Track Social Media Click
 * For Instagram, WhatsApp, Email, etc.
 * 
 * @param data Social click data
 */
export function trackSocialClick(data: Omit<SocialClickEvent, 'event'>): void {
  pushToDataLayer({
    event: 'social_click',
    ...data,
  });
}

/**
 * Track Navigation Click
 * For header, footer, mobile menu navigation
 * 
 * @param data Navigation click data
 */
export function trackNavigationClick(data: Omit<NavigationClickEvent, 'event'>): void {
  pushToDataLayer({
    event: 'navigation_click',
    ...data,
  });
}

/**
 * Track Conversion
 * For partnerships, bookings, registrations
 * 
 * @param data Conversion data
 */
export function trackConversion(data: Omit<ConversionEvent, 'event'>): void {
  pushToDataLayer({
    event: 'conversion',
    ...data,
  });
}

/**
 * Track Search
 * 
 * @param data Search data
 */
export function trackSearch(data: Omit<SearchEvent, 'event'>): void {
  pushToDataLayer({
    event: 'search',
    ...data,
  });
}

/**
 * Track Error
 * For 404, 500, validation errors
 * 
 * @param data Error data
 */
export function trackError(data: Omit<ErrorEvent, 'event'>): void {
  pushToDataLayer({
    event: 'error',
    ...data,
  });
}

/**
 * Track Custom Event
 * For any custom tracking needs
 * 
 * @param data Custom event data (must include event_name)
 */
export function trackCustomEvent(data: Omit<CustomEvent, 'event'>): void {
  if (!data.event_name) {
    return;
  }
  
  pushToDataLayer({
    event: 'custom_event',
    ...data,
  } as CustomEvent);
}

/**
 * Clear dataLayer (for testing/debugging)
 * ⚠️ Use with caution - only for development
 */
export function clearDataLayer(): void {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer = [];
    gtmDebugLog('dataLayer cleared');
  }
}

/**
 * Get all dataLayer events (for debugging)
 * 
 * @returns Array of all events in dataLayer
 */
export function getDataLayerEvents(): DataLayerEvent[] {
  if (typeof window === 'undefined' || !window.dataLayer) {
    return [];
  }
  return window.dataLayer;
}

/**
 * Set user ID for tracking
 * Useful for logged-in users
 * 
 * @param userId User identifier
 */
export function setUserId(userId: string): void {
  if (typeof window === 'undefined') return;
  
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  
  // Use type assertion for non-standard events
  (window.dataLayer as unknown[]).push({
    event: 'set_user_id',
    user_id: userId,
  });
}

/**
 * Remove user ID (on logout)
 */
export function removeUserId(): void {
  if (typeof window === 'undefined') return;
  
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  
  // Use type assertion for non-standard events
  (window.dataLayer as unknown[]).push({
    event: 'remove_user_id',
    user_id: undefined,
  });
}
