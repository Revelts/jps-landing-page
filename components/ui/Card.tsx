/**
 * Card Component
 * Single Responsibility: Display content in a card container
 * Mobile-first: Refined padding and spacing
 */
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
}

export function Card({ children, className, hover = false, clickable = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white shadow-sm',
        // Refined padding - comfortable but not excessive
        'p-5 sm:p-6 md:p-7',
        hover && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        clickable && 'cursor-pointer active:scale-[0.98]',
        className
      )}
    >
      {children}
    </div>
  );
}
