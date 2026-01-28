/**
 * Fluid Container Component
 * 
 * Fully responsive container using clamp() for fluid sizing
 * Automatically scales padding and max-width across all devices
 * 
 * Props:
 * - size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
 * - as: HTML element to render as
 * - children: ReactNode
 */

import { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: ElementType;
  className?: string;
  id?: string;
}

export function Container({
  children,
  size = 'md',
  as: Component = 'div',
  className,
  ...props
}: ContainerProps) {
  const sizeStyles = {
    // Content containers (for text-heavy content)
    sm: 'max-w-content-sm',        // clamp(20rem, 85vw, 42rem) → 320px-672px
    
    // Standard container
    md: 'max-w-container',         // clamp(20rem, 90vw, 80rem) → 320px-1280px
    
    // Large container
    lg: 'max-w-container-lg',      // clamp(20rem, 90vw, 96rem) → 320px-1536px
    
    // Extra large (wide)
    xl: 'max-w-wide',              // clamp(20rem, 95vw, 120rem) → 320px-1920px
    
    // Full width (no max-width)
    full: 'max-w-none',
  };

  return (
    <Component
      className={cn(
        // Base styles - fluid padding
        'w-full mx-auto',
        'px-[var(--container-padding)]', // clamp(1rem, 4vw, 3rem)
        
        // Size-specific max-width
        sizeStyles[size],
        
        // Custom className
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * ContentContainer - Optimized for reading
 * Narrower max-width for better text readability
 */
export function ContentContainer({
  children,
  className,
  ...props
}: Omit<ContainerProps, 'size'>) {
  return (
    <div
      className={cn(
        'w-full mx-auto',
        'max-w-content',               // clamp(20rem, 90vw, 48rem)
        'px-[var(--container-padding)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
