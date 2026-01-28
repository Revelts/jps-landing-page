/**
 * Click Tracker
 * 
 * Automatically tracks all clicks on links and buttons
 * Works for internal navigation and external links
 */

'use client';

import { useEffect } from 'react';
import { trackClick, trackSocialClick, trackNavigationClick } from '@/lib/analytics/dataLayer';

export function ClickTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find the closest clickable element (a, button, etc.)
      const clickable = target.closest('a, button, [role="button"]');
      
      if (!clickable) return;

      const element = clickable as HTMLAnchorElement | HTMLButtonElement;
      const text = element.textContent?.trim() || '';
      const href = 'href' in element ? element.href : '';
      const className = element.className || '';
      
      // Get element type
      const elementType = element.tagName.toLowerCase();

      // Track social media clicks
      if (href && (
        href.includes('instagram.com') ||
        href.includes('whatsapp.com') || href.includes('wa.me') ||
        href.includes('facebook.com') || href.includes('fb.com') ||
        href.includes('twitter.com') || href.includes('x.com') ||
        href.includes('tiktok.com') ||
        href.includes('discord.com') ||
        href.includes('linkedin.com') ||
        href.includes('youtube.com') || href.includes('youtu.be')
      )) {
        const platform = getSocialPlatform(href);
        
        trackSocialClick({
          platform,
          action: 'view',
          link_url: href,
          link_text: text,
        });
        return;
      }

      // Track navigation clicks (internal links)
      if (href && (href.startsWith('/') || href.includes(window.location.hostname))) {
        trackNavigationClick({
          link_text: text,
          link_url: href,
          link_domain: new URL(href, window.location.href).hostname,
          element_type: elementType,
        });
        return;
      }

      // Track external links
      if (href && href.startsWith('http')) {
        trackClick({
          element_type: elementType,
          element_text: text,
          element_id: element.id || undefined,
          element_classes: className || undefined,
          link_url: href,
          link_domain: new URL(href).hostname,
        });
        return;
      }

      // Track button clicks (no href)
      if (elementType === 'button' || element.getAttribute('role') === 'button') {
        trackClick({
          element_type: 'button',
          element_text: text,
          element_id: element.id || undefined,
          element_classes: className || undefined,
        });
        return;
      }
    };

    // Add click listener
    document.addEventListener('click', handleClick, true);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return null; // Tracking-only component
}

/**
 * Get social media platform from URL
 */
function getSocialPlatform(url: string): 'instagram' | 'whatsapp' | 'email' | 'twitter' | 'facebook' | 'other' {
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('whatsapp.com') || url.includes('wa.me')) return 'whatsapp';
  if (url.includes('facebook.com') || url.includes('fb.com')) return 'facebook';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  // Map other social platforms to 'other'
  return 'other';
}
