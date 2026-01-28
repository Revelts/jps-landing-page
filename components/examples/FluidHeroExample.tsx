/**
 * Fluid Hero Section Example
 * 
 * Demonstrates:
 * - Fluid typography (display text scales automatically)
 * - Fluid spacing (padding/margins scale with viewport)
 * - Fluid buttons (touch targets maintain accessibility)
 * - Responsive grid (auto-adjusts columns)
 * 
 * This component works perfectly from 320px to 4K displays
 * without ANY breakpoint-based overrides
 */

import { Section, SectionHeader } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';

export function FluidHeroExample() {
  return (
    <Section spacing="lg" background="gradient">
      <SectionHeader align="center">
        {/* Display heading - scales from 56px to 72px */}
        <Heading level="display" className="mb-[var(--space-lg)]">
          Jakarta Party Squad
        </Heading>
        
        {/* Subheading - scales from 17px to 18px */}
        <Text size="lg" color="muted" className="max-w-content-lg mx-auto">
          Komunitas nightlife terbesar di Jakarta. Event partner untuk nightclub,
          festival musik, dan party entertainment.
        </Text>
      </SectionHeader>

      {/* CTA Buttons - fluid sizing and spacing */}
      <div className="flex flex-wrap items-center justify-center gap-[var(--space-md)]">
        <Button size="lg" variant="primary">
          Join Community
        </Button>
        <Button size="lg" variant="outline">
          View Events
        </Button>
      </div>

      {/* Stats Grid - auto-fit responsive */}
      <div className="grid-auto-fit mt-[var(--space-3xl)]">
        {[
          { label: 'Members', value: '1,000+' },
          { label: 'Events', value: '500+' },
          { label: 'Partners', value: '50+' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <Text size="xl" weight="bold" className="text-primary">
              {stat.value}
            </Text>
            <Text size="sm" color="muted">
              {stat.label}
            </Text>
          </div>
        ))}
      </div>
    </Section>
  );
}
