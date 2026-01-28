/**
 * Fluid Card Grid Example
 * 
 * Demonstrates:
 * - Auto-fit grid (columns adjust automatically)
 * - Fluid card padding and border radius
 * - Responsive images
 * - Scalable typography in cards
 * 
 * Grid automatically adjusts from 1 column (mobile)
 * to 4 columns (desktop) without breakpoints
 */

import { Section, SectionHeader, SectionGrid } from '@/components/ui/Section';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import Image from 'next/image';

export function FluidCardGridExample() {
  const partners = [
    { name: 'Club One', logo: '/assets/partners/1.jpg' },
    { name: 'Club Two', logo: '/assets/partners/2.jpg' },
    { name: 'Club Three', logo: '/assets/partners/3.jpg' },
    { name: 'Club Four', logo: '/assets/partners/4.jpg' },
  ];

  return (
    <Section spacing="lg">
      <SectionHeader>
        <Heading level={2}>Our Partners</Heading>
        <Text color="muted">
          Trusted by the best nightclubs in Jakarta
        </Text>
      </SectionHeader>

      {/* Auto-fit grid - responsive without breakpoints */}
      <SectionGrid columns="auto-fit">
        {partners.map((partner) => (
          <Card key={partner.name} hoverable padding="lg">
            <CardHeader>
              {/* Responsive image */}
              <div className="aspect-video relative rounded-[var(--radius)] overflow-hidden">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            
            <CardBody>
              <Heading level={4}>{partner.name}</Heading>
              <Text size="sm" color="muted">
                Premium nightclub experience in the heart of Jakarta
              </Text>
            </CardBody>
          </Card>
        ))}
      </SectionGrid>
    </Section>
  );
}
