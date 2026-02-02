/**
 * Fluid Text Component
 * 
 * Responsive text with fluid sizing using CSS custom properties
 * Scales automatically from mobile to desktop
 * 
 * Props:
 * - size: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
 * - color: color variants
 * - align: text alignment
 * - weight: font weight
 * - as: HTML element
 */

import { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

interface TextProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'white' | 'gray';
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  as?: ElementType;
  className?: string;
}

export function Text({
  children,
  size = 'base',
  color = 'gray',
  align = 'left',
  weight = 'normal',
  as: Component = 'p',
  className,
  ...props
}: TextProps) {
  // Fluid typography using CSS variables
  const sizeStyles = {
    xs: 'text-[var(--text-xs)] leading-[1.5]',      // 11px → 12px
    sm: 'text-[var(--text-sm)] leading-[1.5]',      // 13px → 14px
    base: 'text-[var(--text-base)] leading-[1.625]', // 15px → 16px
    lg: 'text-[var(--text-lg)] leading-[1.625]',    // 17px → 18px
    xl: 'text-[var(--text-xl)] leading-[1.5]',      // 18px → 20px
  };

  const colorStyles = {
    primary: 'text-secondary',
    secondary: 'text-text-secondary',
    tertiary: 'text-text-tertiary',
    muted: 'text-text-muted',
    white: 'text-text-primary',
    gray: 'text-text-secondary',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <Component
      className={cn(
        // Fluid size from CSS var
        sizeStyles[size],
        
        // Color
        colorStyles[color],
        
        // Alignment
        alignStyles[align],
        
        // Weight
        weightStyles[weight],
        
        // Custom className
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
