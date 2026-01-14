/**
 * Text Component
 * Single Responsibility: Render text with consistent styling
 * Mobile-first: Refined font sizes for optimal readability
 */
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TextProps {
  children: ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'white';
  align?: 'left' | 'center' | 'right';
  as?: 'p' | 'span' | 'div';
}

export function Text({
  children,
  className,
  size = 'base',
  color = 'secondary',
  align = 'left',
  as: Component = 'p',
}: TextProps) {
  // Refined sizes - not too big, not too small
  const sizeStyles = {
    xs: 'text-xs leading-relaxed',
    sm: 'text-sm leading-relaxed',
    base: 'text-sm sm:text-base leading-relaxed',
    lg: 'text-base sm:text-lg leading-relaxed',
    xl: 'text-lg sm:text-xl leading-relaxed',
  };
  
  const colorStyles = {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    tertiary: 'text-tertiary',
    muted: 'text-gray-500',
    white: 'text-white',
  };
  
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  return (
    <Component
      className={cn(
        sizeStyles[size],
        colorStyles[color],
        alignStyles[align],
        className
      )}
    >
      {children}
    </Component>
  );
}
