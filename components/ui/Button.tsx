/**
 * Fluid Button Component
 * 
 * Fully responsive button with:
 * - Fluid typography (scales with viewport)
 * - Minimum touch target (44px) for accessibility
 * - Fluid padding and border radius
 * - Icon support with proper scaling
 * 
 * Mobile-first design ensures comfortable tap areas on all devices
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  asChild?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    // Layout
    'inline-flex items-center justify-center',
    'font-medium',
    
    // Transitions
    'transition-all duration-200',
    
    // Focus states (accessibility)
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    
    // Disabled states
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    
    // Active state
    'active:scale-[0.98]'
  );

  const variantStyles = {
    primary: cn(
      'bg-primary hover:bg-primary-600 text-white',
      'focus:ring-primary-500',
      'shadow-md hover:shadow-lg'
    ),
    secondary: cn(
      'bg-secondary hover:bg-secondary-600 text-white',
      'focus:ring-secondary-500',
      'shadow-md hover:shadow-lg'
    ),
    outline: cn(
      'border-2 border-primary text-primary',
      'hover:bg-primary hover:text-white',
      'focus:ring-primary-500'
    ),
    ghost: cn(
      'text-primary hover:bg-primary-50',
      'focus:ring-primary-500'
    ),
  };

  // Fluid sizing using CSS variables
  const sizeStyles = {
    sm: cn(
      'text-[var(--text-sm)]',                    // Fluid font
      'px-[var(--space-md)] py-[var(--space-sm)]', // Fluid padding
      'rounded-[var(--radius)]',                   // Fluid border-radius
      'min-h-[calc(var(--touch-target)-4px)]',    // 40px min height
      'gap-[var(--space-xs)]'                      // Gap between icon & text
    ),
    md: cn(
      'text-[var(--text-base)]',                  // Fluid font
      'px-[var(--space-lg)] py-[var(--space-sm)]', // Fluid padding
      'rounded-[var(--radius-md)]',               // Fluid border-radius
      'min-h-[var(--touch-target)]',              // 44px min height
      'gap-[var(--space-sm)]'                     // Gap between icon & text
    ),
    lg: cn(
      'text-[var(--text-lg)]',                    // Fluid font
      'px-[var(--space-xl)] py-[var(--space-md)]', // Fluid padding
      'rounded-[var(--radius-lg)]',               // Fluid border-radius
      'min-h-[var(--touch-target-lg)]',           // 48px min height
      'gap-[var(--space-sm)]'                     // Gap between icon & text
    ),
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Icon Button - For buttons with only icons
 * Ensures square aspect ratio and proper touch target
 */
interface IconButtonProps extends Omit<ButtonProps, 'fullWidth'> {
  'aria-label': string; // Required for accessibility
}

export function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  className,
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    sm: 'w-10 h-10 p-[var(--space-xs)]',
    md: 'w-11 h-11 p-[var(--space-sm)]',
    lg: 'w-12 h-12 p-[var(--space-md)]',
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'aspect-square',
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
