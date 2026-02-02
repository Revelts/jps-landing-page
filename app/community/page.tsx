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
    'Bergabung dengan 1,000+ members Jakarta Party Squad! Dapatkan free hosting di nightclub, akses eksklusif ke party events, diskon spesial, dan networking dengan party enthusiasts. Join komunitas nightlife terbaik di Jakarta sekarang!',
  keywords:
    'join jakarta party, jakarta party community, jakarta nightlife community, free hosting jakarta, jakarta club membership, join party jakarta, jakarta clubbing community, jakarta party group, jakarta nightlife benefits, jakarta party networking, clubbing friends jakarta, jakarta party enthusiasts',
  canonical: '/community',
});

export default function CommunityPage() {
  const { benefits, mainHero } = siteConfig;

  return (
    <>
      {/* Page Hero */}
      <Section className="relative overflow-hidden pt-24 sm:pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-accent/10 animate-gradient-shift bg-[length:200%_200%]" />
        </div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        
        <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <Heading level={1} align="center" className="gradient-text tracking-wide">
            {benefits.title}
          </Heading>
          <Text size="lg" color="secondary" align="center" className="font-medium text-text-secondary">
            {benefits.subtitle}
          </Text>
          <Text size="base" color="secondary" align="center" className="text-text-tertiary">
            {benefits.description}
          </Text>
        </div>
      </Section>

      {/* Benefits Grid */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary" />
        
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {benefits.items.map((benefit, index) => (
            <Card key={index} hoverable variant="elevated" className="text-center">
              <div className="space-y-4">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 p-2 rounded-xl bg-surface/50 backdrop-blur-sm border border-secondary/20">
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
                  <Heading level={3} className="text-xl sm:text-2xl gradient-text" align="center">
                    {benefit.name}
                  </Heading>
                  <Text size="base" color="secondary" align="center" className="text-text-secondary">
                    {benefit.description}
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-accent/20 to-secondary/20 animate-gradient-shift bg-[length:200%_200%]" />
        <div className="absolute inset-0 backdrop-blur-3xl bg-surface/30" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-glow-pulse" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <Card variant="elevated" className="text-center glass-strong">
            <div className="space-y-6">
              <Heading level={2} align="center" className="gradient-text">
                Ready to Join the Squad?
              </Heading>
              <Text size="lg" color="secondary" align="center" className="text-text-secondary">
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
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 to-bg-primary" />
        
        <div className="relative z-10 space-y-8 sm:space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} align="center" className="gradient-text">
              How to Get Started
            </Heading>
            <Text size="base" color="secondary" align="center" className="text-text-secondary">
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
              <Card key={index} variant="elevated" className="text-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-secondary to-accent text-bg-primary rounded-full text-2xl sm:text-3xl font-bold shadow-glow">
                    {item.step}
                  </div>
                  <Heading level={3} className="text-xl sm:text-2xl gradient-text" align="center">
                    {item.title}
                  </Heading>
                  <Text size="base" color="secondary" align="center" className="text-text-secondary">
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
