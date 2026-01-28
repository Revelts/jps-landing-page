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
    // Background
    'bg-white',
    
    // Border radius (fluid)
    'rounded-[var(--radius-lg)]',
    
    // Transitions
    'transition-all duration-200'
  );

  const variantStyles = {
    default: cn(
      'shadow-sm',
      hoverable && 'hover:shadow-md'
    ),
    bordered: cn(
      'border border-gray-200',
      hoverable && 'hover:border-gray-300'
    ),
    elevated: cn(
      'shadow-lg',
      hoverable && 'hover:shadow-xl'
    ),
    flat: cn(
      'border border-gray-100',
      hoverable && 'hover:bg-gray-50'
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
