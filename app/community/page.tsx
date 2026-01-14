/**
 * Community/Benefits Page
 * Single Responsibility: Display community benefits and how to join
 * SEO: Optimized for "community benefits" and "join" keywords
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
  title: 'Join Jakarta Party Community - Free Hosting & Exclusive Benefits',
  description:
    'Bergabung dengan 10,000+ members Jakarta Party Squad! Dapatkan free hosting di nightclub, akses eksklusif ke party events, diskon spesial, dan networking dengan party enthusiasts. Join komunitas nightlife terbaik di Jakarta sekarang!',
  keywords:
    'join jakarta party, jakarta party community, jakarta nightlife community, free hosting jakarta, jakarta club membership, join party jakarta, jakarta clubbing community, jakarta party group, jakarta nightlife benefits, jakarta party networking, clubbing friends jakarta, jakarta party enthusiasts',
  canonical: '/community',
});

export default function CommunityPage() {
  const { benefits, mainHero } = siteConfig;

  return (
    <>
      {/* Page Hero */}
      <Section className="bg-gradient-to-b from-primary-50 to-white pt-24 sm:pt-28">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <Heading level={1} align="center">
            {benefits.title}
          </Heading>
          <Text size="lg" color="secondary" align="center" className="font-medium">
            {benefits.subtitle}
          </Text>
          <Text size="base" color="secondary" align="center">
            {benefits.description}
          </Text>
        </div>
      </Section>

      {/* Benefits Grid */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {benefits.items.map((benefit, index) => (
            <Card key={index} hover className="text-center">
              <div className="space-y-4">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    <Image
                      src={benefit.icon}
                      alt={benefit.name}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <Heading level={3} className="text-xl sm:text-2xl" align="center">
                    {benefit.name}
                  </Heading>
                  <Text size="base" color="secondary" align="center">
                    {benefit.description}
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-b from-primary-50 to-primary-100">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center bg-white">
            <div className="space-y-6">
              <Heading level={2} align="center">
                Ready to Join the Squad?
              </Heading>
              <Text size="lg" color="secondary" align="center">
                Join over 2,000+ active members and become part of Jakarta's most vibrant nightlife community!
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href={mainHero.secondaryAction.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg">
                    Join WhatsApp Community
                  </Button>
                </Link>
                <Link
                  href={mainHero.primaryAction.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg">
                    Partner with Us
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* How It Works */}
      <Section>
        <div className="space-y-8 sm:space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} align="center">
              How to Get Started
            </Heading>
            <Text size="base" color="secondary" align="center">
              Join our community in 3 simple steps
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: '1',
                title: 'Join WhatsApp Group',
                description: 'Click the link and introduce yourself to the community. Share your interests and what brings you to JPS.',
              },
              {
                step: '2',
                title: 'Follow on Social Media',
                description: 'Stay updated with the latest events, parties, and exclusive announcements on Instagram and TikTok.',
              },
              {
                step: '3',
                title: 'Attend Events',
                description: 'Check out our event schedule and join your first party! Meet the community and start networking.',
              },
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary text-white rounded-full text-2xl sm:text-3xl font-bold">
                    {item.step}
                  </div>
                  <Heading level={3} className="text-xl sm:text-2xl" align="center">
                    {item.title}
                  </Heading>
                  <Text size="base" color="secondary" align="center">
                    {item.description}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
