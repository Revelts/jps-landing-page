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
      
      // Get element type and name
      const elementType = element.tagName.toLowerCase();
      const elementName = element.getAttribute('aria-label') || 
                         element.getAttribute('title') || 
                         text ||
                         'Unknown';

      // Track social media clicks
      if (href && (
        href.includes('instagram.com') ||
        href.includes('tiktok.com') ||
        href.includes('discord.com') ||
        href.includes('whatsapp.com') ||
        href.includes('facebook.com') ||
        href.includes('twitter.com') ||
        href.includes('linkedin.com')
      )) {
        const platform = getSocialPlatform(href);
        
        trackSocialClick({
          platform,
          action: 'click',
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
function getSocialPlatform(url: string): string {
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('discord.com') || url.includes('discord.gg')) return 'discord';
  if (url.includes('whatsapp.com') || url.includes('wa.me')) return 'whatsapp';
  if (url.includes('facebook.com') || url.includes('fb.com')) return 'facebook';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  if (url.includes('linkedin.com')) return 'linkedin';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  return 'other';
}
