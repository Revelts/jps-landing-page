/**
 * Fluid Card Component
 * 
 * Responsive card with fluid sizing:
 * - Fluid padding (scales with viewport)
 * - Fluid border radius
 * - Smooth hover effects
 * - Optional variants
 */

import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  className?: string;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className,
  ...props
}: CardProps) {
  const baseStyles = cn(
    // Glassmorphism background
    'bg-surface/50 backdrop-blur-md',
    
    // Border radius (fluid)
    'rounded-[var(--radius-lg)]',
    
    // Border with subtle glow
    'border border-border-secondary/30',
    
    // Transitions - smooth and elegant
    'transition-all duration-500 ease-out'
  );

  const variantStyles = {
    default: cn(
      'shadow-card-premium',
      hoverable && 'hover:shadow-card-hover hover:border-secondary/30 hover:-translate-y-1'
    ),
    bordered: cn(
      'border-2 border-secondary/20',
      hoverable && 'hover:border-secondary/40 hover:shadow-glow-sm'
    ),
    elevated: cn(
      'shadow-glass bg-surface/70',
      hoverable && 'hover:shadow-card-hover hover:bg-surface/80 hover:-translate-y-2'
    ),
    flat: cn(
      'border border-border-primary bg-surface/30',
      hoverable && 'hover:bg-surface/50 hover:border-secondary/20'
    ),
  };

  const paddingStyles = {
    none: '',
    sm: 'p-[var(--space-md)]',      // Fluid padding sm
    md: 'p-[var(--space-lg)]',      // Fluid padding md
    lg: 'p-[var(--space-xl)]',      // Fluid padding lg
  };

  const hoverStyles = hoverable
    ? 'hover:-translate-y-0.5 cursor-pointer'
    : '';

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        paddingStyles[padding],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CardHeader - Fluid spacing
 */
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'mb-[var(--space-md)]', // Fluid margin
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * CardBody - Fluid spacing
 */
interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div
      className={cn(
        'space-y-[var(--space-sm)]', // Fluid vertical spacing
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * CardFooter - Fluid spacing
 */
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        'mt-[var(--space-lg)]', // Fluid margin
        'pt-[var(--space-md)]', // Fluid padding
        'border-t border-gray-100',
        className
      )}
    >
      {children}
    </div>
  );
}
