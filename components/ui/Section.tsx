/**
 * Section Component
 * Single Responsibility: Provide consistent section spacing
 * Mobile-first: Refined spacing for better rhythm
 */
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  noPadding?: boolean;
}

export function Section({ 
  children, 
  className, 
  containerSize = 'xl',
  noPadding = false,
}: SectionProps) {
  return (
    <section
      className={cn(
        // Refined vertical spacing - comfortable rhythm
        !noPadding && 'py-10 sm:py-12 md:py-16 lg:py-20',
        className
      )}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}
