/**
 * Container Component
 * Single Responsibility: Provide consistent max-width and padding
 * Mobile-first: Refined padding for comfortable reading
 */
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({ children, className, size = 'xl' }: ContainerProps) {
  const sizeStyles = {
    sm: 'max-w-2xl',   // Narrow for text-heavy content
    md: 'max-w-4xl',   // Medium for articles
    lg: 'max-w-6xl',   // Large for layouts
    xl: 'max-w-7xl',   // Extra large (default)
    full: 'max-w-full', // Full width
  };
  
  return (
    <div
      className={cn(
        'mx-auto w-full',
        // Refined mobile-first padding - comfortable but not too much
        'px-4 sm:px-6 md:px-8 lg:px-10',
        sizeStyles[size],
        className
      )}
    >
      {children}
    </div>
  );
}
