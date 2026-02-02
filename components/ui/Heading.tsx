/**
 * Fluid Heading Component
 * 
 * Fully responsive headings using CSS custom properties with clamp()
 * Typography scales automatically across all screen sizes
 * 
 * Props:
 * - level: 1 | 2 | 3 | 4 | 5 | 6 | 'display'
 * - align: 'left' | 'center' | 'right'
 * - weight: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
 * - className: Additional Tailwind classes
 */

import { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 'display';
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  className?: string;
  id?: string;
}

export function Heading({
  level = 2,
  children,
  align = 'left',
  weight,
  className,
  ...props
}: HeadingProps) {
  // Determine HTML tag
  const Tag: ElementType = level === 'display' ? 'h1' : `h${level}`;

  // Fluid typography styles using CSS variables
  const levelStyles = {
    display: 'text-[var(--text-7xl)] leading-[1.1] -tracking-[0.03em]',  // 56px → 72px
    1: 'text-[var(--text-5xl)] leading-[1.15] -tracking-[0.02em]',       // 40px → 48px
    2: 'text-[var(--text-4xl)] leading-[1.2] -tracking-[0.01em]',        // 32px → 36px
    3: 'text-[var(--text-3xl)] leading-[1.3]',                           // 28px → 30px
    4: 'text-[var(--text-2xl)] leading-[1.3]',                           // 22px → 24px
    5: 'text-[var(--text-xl)] leading-[1.4]',                            // 18px → 20px
    6: 'text-[var(--text-lg)] leading-[1.5]',                            // 17px → 18px
  };

  // Default font weights per level
  const defaultWeights = {
    display: 'font-bold',
    1: 'font-bold',
    2: 'font-bold',
    3: 'font-semibold',
    4: 'font-semibold',
    5: 'font-semibold',
    6: 'font-semibold',
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <Tag
      className={cn(
        // Fluid typography from CSS var
        levelStyles[level],
        
        // Weight (use default if not specified)
        weight ? weightStyles[weight] : defaultWeights[level],
        
        // Alignment
        alignStyles[align],
        
        // Color
        'text-text-primary',
        
        // Spacing below (fluid)
        'mb-[var(--space-md)]',
        
        // Custom className
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
