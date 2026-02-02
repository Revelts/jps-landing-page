/**
 * Partners Page
 * Single Responsibility: Display all partners and collaborations
 * SEO: Optimized for "partners" and "collaboration" keywords
 */
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'Partners - Top Nightclub & Venue Collaborations Jakarta',
  description:
    'Partner resmi 50+ venue nightlife terbaik di Jakarta: Wildout, Blackowl, Fyne, Flow, Oasis. Kerjasama event nightclub, festival musik, dan brand activation. Mitra terpercaya untuk nightlife entertainment Jakarta.',
  keywords:
    'jakarta nightclub partners, jakarta venue partners, nightclub jakarta collaboration, jakarta party venue, jakarta club partnership, event venue jakarta, best nightclub jakarta, jakarta entertainment venue, jakarta nightlife venue, club jakarta partners, jakarta event collaboration',
  canonical: '/partners',
});

export default function PartnersPage() {
  const { partners, mainHero } = siteConfig;

  return (
    <>
      {/* Page Hero */}
      <Section className="relative overflow-hidden pt-24 sm:pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-accent/10 animate-gradient-shift bg-[length:200%_200%]" />
        </div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        
        <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <Heading level={1} align="center" className="gradient-text tracking-wide">
            {partners.title}
          </Heading>
          <Text size="lg" color="secondary" align="center" className="text-text-secondary">
            {partners.description}
          </Text>
        </div>
      </Section>

      {/* Partners Grid */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary" />
        
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {partners.items.map((partner, index) => (
            <Link
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card hoverable className="h-full group">
                <div className="space-y-4">
                  {/* Logo */}
                  <div className="relative aspect-square bg-surface/30 rounded-xl overflow-hidden flex items-center justify-center p-4 border border-secondary/10 group-hover:border-secondary/30 transition-all duration-500">
                    <div className="relative w-full h-full">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 brightness-75 group-hover:brightness-100"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  </div>
                  
                  {/* Name */}
                  <div className="text-center">
                    <h3 className="font-semibold text-text-primary text-sm sm:text-base group-hover:text-secondary transition-colors">
                      {partner.name}
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* Closing Statement */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <Card variant="elevated" className="text-center">
            <div className="space-y-6">
              <Text size="lg" color="secondary" align="center" className="leading-relaxed text-text-secondary">
                {partners.closing}
              </Text>
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 to-bg-primary" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <Heading level={2} align="center" className="gradient-text">
            Interested in Partnership?
          </Heading>
          <Text size="lg" color="secondary" align="center" className="text-text-secondary">
            Let's collaborate to create unforgettable experiences for your audience
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={mainHero.primaryAction.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg">
                Partner with Us
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
