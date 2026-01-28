/**
 * Tracked Button Component
 * 
 * Wrapper around Button component with automatic click tracking
 * Use this for important CTAs you want to track in analytics
 */

'use client';

import { ReactNode, ComponentProps } from 'react';
import { Button } from '@/components/ui/Button';
import { trackClick } from '@/lib/analytics/dataLayer';

interface TrackedButtonProps extends ComponentProps<typeof Button> {
  /**
   * Tracking label (defaults to children text content)
   */
  trackingLabel?: string;
  
  /**
   * Section name where button appears
   */
  sectionName?: string;
  
  /**
   * Position/order in the section
   */
  position?: number;
  
  /**
   * Disable tracking (useful for testing)
   */
  disableTracking?: boolean;
}

export function TrackedButton({
  children,
  trackingLabel,
  sectionName,
  position,
  disableTracking = false,
  onClick,
  ...props
}: TrackedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track click event
    if (!disableTracking) {
      const clickText = trackingLabel || extractTextContent(children);
      
      trackClick({
        click_text: clickText,
        click_id: props.id,
        element_type: 'button',
        section_name: sectionName,
        position,
      });
    }

    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
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
