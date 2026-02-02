/**
 * Featured Partners Section Component
 * Single Responsibility: Display featured partners
 * Mobile-first: Scrollable on mobile, grid on desktop
 */
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';
import { siteConfig } from '@/lib/config';

export function FeaturedPartners() {
  const { partners } = siteConfig;
  const featuredPartners = partners.items.slice(0, 6);

  return (
    <Section className="relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/50 to-bg-primary" />
      
      <div className="relative z-10 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Heading level={2} align="center" className="gradient-text tracking-wide">
            {partners.title}
          </Heading>
          <Text size="base" color="secondary" align="center" className="text-text-secondary">
            {partners.description}
          </Text>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {featuredPartners.map((partner, index) => (
            <Link
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-surface/30 backdrop-blur-sm rounded-xl border border-secondary/10 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-500 hover:-translate-y-2 p-4 flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} - Partner nightclub Jakarta Party Squad`}
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 brightness-75 group-hover:brightness-100"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/partners">
            <Button variant="primary" size="lg">
              View All Partners
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
