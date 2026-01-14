/**
 * Heading Component
 * Single Responsibility: Render semantic headings with consistent styling
 * Mobile-first: Refined responsive font sizes for better readability
 */
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function Heading({ level, children, className, align = 'left' }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const baseStyles = 'font-bold leading-tight tracking-tight';
  
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  // Mobile-first responsive font sizes - refined for better proportions
  const levelStyles = {
    1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900',
    2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900',
    3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-900',
    4: 'text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800',
    5: 'text-sm sm:text-base md:text-lg text-gray-800',
    6: 'text-sm sm:text-base text-gray-800',
  };
  
  return (
    <Tag className={cn(baseStyles, levelStyles[level], alignStyles[align], className)}>
      {children}
    </Tag>
  );
}
