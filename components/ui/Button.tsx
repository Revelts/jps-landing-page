/**
 * Button Component
 * Single Responsibility: Render button with consistent styling
 * Open/Closed: Extendable through variants without modification
 * Mobile-first: Refined sizing with proper touch targets
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
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-600 text-white focus:ring-primary-500 shadow-md hover:shadow-lg active:scale-[0.98]',
    secondary: 'bg-secondary hover:bg-secondary-600 text-white focus:ring-secondary-500 shadow-md hover:shadow-lg active:scale-[0.98]',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary-500 active:scale-[0.98]',
    ghost: 'text-primary hover:bg-primary-50 focus:ring-primary-500 active:scale-[0.98]',
  };
  
  // Refined sizing - comfortable and proportional
  const sizeStyles = {
    sm: 'text-sm px-4 py-2 min-h-[40px]',
    md: 'text-sm sm:text-base px-5 py-2.5 min-h-[44px]',
    lg: 'text-base sm:text-lg px-6 py-3 min-h-[48px]',
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
      {...props}
    >
      {children}
    </button>
  );
}
