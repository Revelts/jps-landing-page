/**
 * Tracked Link Component
 * 
 * Link component with automatic click tracking
 * Use for navigation links, external links, downloads
 */

'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { trackClick } from '@/lib/analytics/dataLayer';

interface TrackedLinkProps {
  href: string;
  children: ReactNode;
  
  /**
   * Tracking label (defaults to children text)
   */
  trackingLabel?: string;
  
  /**
   * Section name where link appears
   */
  sectionName?: string;
  
  /**
   * Position/order in the section
   */
  position?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Target attribute (e.g., '_blank')
   */
  target?: string;
  
  /**
   * Rel attribute
   */
  rel?: string;
  
  /**
   * Disable tracking
   */
  disableTracking?: boolean;
}

export function TrackedLink({
  href,
  children,
  trackingLabel,
  sectionName,
  position,
  className,
  target,
  rel,
  disableTracking = false,
}: TrackedLinkProps) {
  const handleClick = () => {
    if (!disableTracking) {
      const clickText = trackingLabel || extractTextContent(children);
      
      trackClick({
        click_text: clickText,
        click_url: href,
        element_type: 'link',
        section_name: sectionName,
        position,
      });
    }
  };

  const isExternal = href.startsWith('http') || href.startsWith('//');
  
  // External link
  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  // Internal link
  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

/**
 * Extract text content from ReactNode
 */
function extractTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractTextContent).join(' ');
  return '';
}
