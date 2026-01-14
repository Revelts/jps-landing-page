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
      <Section className="bg-gradient-to-b from-primary-50 to-white pt-24 sm:pt-28">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <Heading level={1} align="center">
            {partners.title}
          </Heading>
          <Text size="lg" color="secondary" align="center">
            {partners.description}
          </Text>
        </div>
      </Section>

      {/* Partners Grid */}
      <Section>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {partners.items.map((partner, index) => (
            <Link
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card hover clickable className="h-full">
                <div className="space-y-4">
                  {/* Logo */}
                  <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-4">
                    <div className="relative w-full h-full">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  </div>
                  
                  {/* Name */}
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
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
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <div className="space-y-6">
              <Text size="lg" color="secondary" align="center" className="leading-relaxed">
                {partners.closing}
              </Text>
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Heading level={2} align="center">
            Interested in Partnership?
          </Heading>
          <Text size="lg" color="secondary" align="center">
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
