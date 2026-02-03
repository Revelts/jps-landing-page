/**
 * GridResponsive Component
 * 
 * Auto-responsive grid that adapts without media queries
 * Uses CSS Grid's auto-fit/auto-fill with minmax()
 * 
 * @example
 * <GridResponsive minWidth={280} gap="lg">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </GridResponsive>
 */

import { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface GridResponsiveProps {
  children: ReactNode;
  minWidth?: number | string;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  columns?: 'auto-fit' | 'auto-fill';
  className?: string;
  align?: 'start' | 'center' | 'end' | 'stretch';
}

export function GridResponsive({
  children,
  minWidth = 280,
  gap = 'lg',
  columns = 'auto-fit',
  className,
  align = 'stretch'
}: GridResponsiveProps) {
  const gapClasses = {
    xs: 'gap-[var(--space-xs)]',
    sm: 'gap-[var(--space-sm)]',
    md: 'gap-[var(--space-md)]',
    lg: 'gap-[var(--space-lg)]',
    xl: 'gap-[var(--space-xl)]',
    '2xl': 'gap-[var(--space-2xl)]'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const minWidthValue = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(min(100%, ${minWidthValue}), 1fr))`
  };

  return (
    <div
      className={cn(
        gapClasses[gap],
        alignClasses[align],
        className
      )}
      style={gridStyle}
    >
      {children}
    </div>
  );
}

/**
 * GridMasonry - Masonry-style grid
 */
interface GridMasonryProps {
  children: ReactNode;
  columns?: number;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function GridMasonry({
  children,
  columns = 3,
  gap = 'md',
  className
}: GridMasonryProps) {
  const gapClasses = {
    xs: 'gap-[var(--space-xs)]',
    sm: 'gap-[var(--space-sm)]',
    md: 'gap-[var(--space-md)]',
    lg: 'gap-[var(--space-lg)]',
    xl: 'gap-[var(--space-xl)]'
  };

  return (
    <div
      className={cn(
        'grid',
        gapClasses[gap],
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridAutoFlow: 'dense'
      }}
    >
      {children}
    </div>
  );
}

/**
 * GridHero - Asymmetric grid for hero sections
 * Text on one side, image/media on the other
 */
interface GridHeroProps {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export function GridHero({
  children,
  reverse = false,
  className,
  gap = 'xl'
}: GridHeroProps) {
  const gapClasses = {
    sm: 'gap-[var(--space-lg)]',
    md: 'gap-[var(--space-xl)]',
    lg: 'gap-[var(--space-2xl)]',
    xl: 'gap-[var(--space-3xl)]'
  };

  return (
    <div
      className={cn(
        'grid grid-cols-1',
        'lg:grid-cols-2',
        'lg:items-center',
        gapClasses[gap],
        reverse && 'lg:[&>*:first-child]:order-2',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * FlexCluster - Auto-wrapping flex container
 * Great for button groups, tags, etc.
 */
interface FlexClusterProps {
  children: ReactNode;
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  justify?: 'start' | 'center' | 'end' | 'between';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

export function FlexCluster({
  children,
  gap = 'md',
  justify = 'start',
  align = 'center',
  className
}: FlexClusterProps) {
  const gapClasses = {
    xs: 'gap-[var(--space-xs)]',
    sm: 'gap-[var(--space-sm)]',
    md: 'gap-[var(--space-md)]',
    lg: 'gap-[var(--space-lg)]'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  return (
    <div
      className={cn(
        'flex flex-wrap',
        gapClasses[gap],
        justifyClasses[justify],
        alignClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Stack - Vertical stack with consistent spacing
 */
interface StackProps {
  children: ReactNode;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function Stack({
  children,
  gap = 'md',
  className
}: StackProps) {
  const gapClasses = {
    xs: 'space-y-[var(--space-xs)]',
    sm: 'space-y-[var(--space-sm)]',
    md: 'space-y-[var(--space-md)]',
    lg: 'space-y-[var(--space-lg)]',
    xl: 'space-y-[var(--space-xl)]',
    '2xl': 'space-y-[var(--space-2xl)]'
  };

  return (
    <div className={cn('flex flex-col', gapClasses[gap], className)}>
      {children}
    </div>
  );
}
