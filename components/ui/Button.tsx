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
    'relative overflow-hidden',
    'letter-spacing-wide',
    
    // Transitions - smooth and elegant
    'transition-all duration-400 ease-out',
    
    // Focus states (accessibility)
    'focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 focus:ring-offset-bg-primary',
    
    // Disabled states
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
    
    // Active state - subtle
    'active:scale-[0.98]'
  );

  const variantStyles = {
    primary: cn(
      // Gradient background with border
      'bg-gradient-to-r from-secondary to-accent',
      'text-bg-primary font-semibold',
      'shadow-glow hover:shadow-glow-lg',
      'hover:from-secondary/90 hover:to-accent/90',
      'hover:-translate-y-0.5',
      'focus:ring-secondary'
    ),
    secondary: cn(
      // Glassmorphism with gradient border
      'bg-surface/30 backdrop-blur-md',
      'text-text-primary',
      'border-2 border-transparent',
      'bg-clip-padding',
      'before:absolute before:inset-0 before:-z-10',
      'before:bg-gradient-to-r before:from-secondary before:to-accent',
      'before:rounded-[inherit] before:p-[2px]',
      'hover:bg-surface/50 hover:shadow-glow-sm',
      'hover:-translate-y-0.5',
      'focus:ring-secondary'
    ),
    outline: cn(
      // Gradient border effect
      'bg-transparent',
      'text-secondary',
      'border-2 border-secondary/50',
      'hover:border-secondary hover:bg-secondary/10',
      'hover:shadow-glow-sm hover:-translate-y-0.5',
      'focus:ring-secondary'
    ),
    ghost: cn(
      'text-secondary bg-transparent',
      'hover:bg-secondary/10 hover:text-secondary',
      'focus:ring-secondary'
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
