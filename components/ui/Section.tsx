/**
 * Fluid Section Component
 * 
 * Responsive section wrapper with:
 * - Fluid vertical spacing (clamp-based)
 * - Optional container
 * - Background variants
 * - Semantic HTML
 */

import { ReactNode, ElementType } from 'react';
import { Container } from './Container';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  as?: ElementType;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  container?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  background?: 'none' | 'gray' | 'gradient';
  className?: string;
  id?: string;
}

export function Section({
  children,
  as: Component = 'section',
  spacing = 'md',
  container = true,
  containerSize = 'md',
  background = 'none',
  className,
  ...props
}: SectionProps) {
  // Fluid spacing using CSS variables
  const spacingStyles = {
    none: '',
    sm: 'py-[var(--section-spacing-sm)]',  // clamp(2rem, 1.6rem + 2vw, 3rem)
    md: 'py-[var(--section-spacing)]',     // clamp(3rem, 2.4rem + 3vw, 5rem)
    lg: 'py-[var(--section-spacing-lg)]',  // clamp(4rem, 3.2rem + 4vw, 7rem)
  };

  const backgroundStyles = {
    none: '',
    gray: 'bg-bg-secondary',
    gradient: 'bg-gradient-to-b from-bg-primary to-bg-secondary',
  };

  const content = container ? (
    <Container size={containerSize}>{children}</Container>
  ) : (
    children
  );

  return (
    <Component
      className={cn(
        spacingStyles[spacing],
        backgroundStyles[background],
        className
      )}
      {...props}
    >
      {content}
    </Component>
  );
}

/**
 * SectionHeader - Centered section header with fluid spacing
 */
interface SectionHeaderProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({
  children,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center mx-auto max-w-content',
    right: 'text-right',
  };

  return (
    <div
      className={cn(
        'mb-[var(--space-2xl)]', // Fluid margin
        alignStyles[align],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * SectionGrid - Auto-fit responsive grid
 */
interface SectionGridProps {
  children: ReactNode;
  columns?: 'auto-fit-sm' | 'auto-fit' | 'auto-fit-lg';
  className?: string;
}

export function SectionGrid({
  children,
  columns = 'auto-fit',
  className,
}: SectionGridProps) {
  const gridStyles = {
    'auto-fit-sm': 'grid-auto-fit-sm',  // minmax(200px, 1fr)
    'auto-fit': 'grid-auto-fit',        // minmax(280px, 1fr)
    'auto-fit-lg': 'grid-auto-fit-lg',  // minmax(320px, 1fr)
  };

  return (
    <div className={cn(gridStyles[columns], className)}>
      {children}
    </div>
  );
}
