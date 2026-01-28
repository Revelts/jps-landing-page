/**
 * Tracked Social Media Link
 * 
 * Special link component for social media interactions
 * Tracks platform, action, and content name
 */

'use client';

import { ReactNode } from 'react';
import { trackSocialClick } from '@/lib/analytics/dataLayer';
import type { SocialClickEvent } from '@/types/analytics';

interface TrackedSocialLinkProps {
  href: string;
  platform: SocialClickEvent['platform'];
  action: SocialClickEvent['action'];
  contentName?: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function TrackedSocialLink({
  href,
  platform,
  action,
  contentName,
  children,
  className,
  ariaLabel,
}: TrackedSocialLinkProps) {
  const handleClick = () => {
    trackSocialClick({
      platform,
      action,
      content_name: contentName,
    });
  };

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={ariaLabel || `${action} on ${platform}`}
    >
      {children}
    </a>
  );
}
