/**
 * Page View Tracker
 * 
 * Automatically tracks page views on route changes (SPA navigation)
 * Handles Next.js App Router navigation events
 */

'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics/dataLayer';
import type { PageViewEvent } from '@/types/analytics';

interface PageViewTrackerProps {
  /**
   * Page type - helps categorize pages in analytics
   */
  pageType?: PageViewEvent['page_type'];
  
  /**
   * Custom page name (defaults to pathname)
   */
  pageName?: string;
  
  /**
   * Additional metadata
   */
  pageCategory?: string;
}

function PageViewTrackerInner({ 
  pageType = 'other', 
  pageName,
  pageCategory 
}: PageViewTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Construct full page path with query params
    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    // Track page view
    trackPageView({
      page_name: pageName || pathname.replace(/^\//, '') || 'home',
      page_path: pagePath,
      page_title: typeof document !== 'undefined' ? document.title : '',
      page_type: pageType,
      page_category: pageCategory,
      page_language: 'id',
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    });
  }, [pathname, searchParams, pageType, pageName, pageCategory]);

  return null; // This is a tracking-only component
}

export function PageViewTracker(props: PageViewTrackerProps) {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner {...props} />
    </Suspense>
  );
}

/**
 * Utility hook for manual page view tracking
 * Use this if you need more control over when tracking happens
 */
export function usePageViewTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const trackPage = (overrides?: Partial<PageViewEvent>) => {
    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    trackPageView({
      page_name: pathname.replace(/^\//, '') || 'home',
      page_path: pagePath,
      page_title: typeof document !== 'undefined' ? document.title : '',
      page_type: 'other',
      page_language: 'id',
      ...overrides,
    });
  };

  return { trackPage };
}
