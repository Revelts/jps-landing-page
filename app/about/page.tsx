/**
 * About Page
 * Single Responsibility: Display detailed about information
 * SEO: Optimized for "about us" and "team" keywords
 */
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'About Jakarta Party Squad - Leading Nightlife Community & Event Organizer',
  description:
    'Cerita Jakarta Party Squad: Komunitas nightlife terbesar di Jakarta sejak 2020. Tim profesional event organizer untuk nightclub, festival musik, dan brand activation. Partner terpercaya 50+ venue di Jakarta.',
  keywords:
    'about jakarta party squad, jakarta nightlife community, jakarta event organizer, nightlife jakarta team, jakarta party organizer, jakarta club promoter, jakarta nightlife media, jakarta entertainment team, event management jakarta, nightlife jakarta history',
  canonical: '/about',
});

export default function AboutPage() {
  const { aboutus, team, founderSpeech } = siteConfig;

  return (
    <>
      {/* Page Hero */}
      <Section className="relative overflow-hidden pt-24 sm:pt-28">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-accent/10 animate-gradient-shift bg-[length:200%_200%]" />
        </div>
        {/* Glow orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        
        <div className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          <Heading level={1} align="center" className="gradient-text tracking-wide">
            About Jakarta Party Squad
          </Heading>
          <Text size="lg" color="secondary" align="center" className="text-text-secondary">
            More than just a party - we're a community, a media platform, and your event partner.
          </Text>
        </div>
      </Section>

      {/* Our Story */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
        
        <div className="relative z-10 space-y-8">
          {aboutus.items.map((item, index) => (
            <Card key={index} variant="elevated" hoverable className="overflow-hidden p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Content */}
                <div className={`p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-center space-y-4 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Heading level={2} className="text-xl sm:text-2xl gradient-text">
                    {item.title}
                  </Heading>
                  <Text size="base" color="secondary" className="text-text-secondary">
                    {item.description}
                  </Text>
                </div>
                
                {/* Image with premium frame */}
                <div className={`relative h-64 sm:h-80 lg:h-full min-h-[300px] bg-surface ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 via-transparent to-transparent" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Founder Speech */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 to-bg-primary" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <Card variant="elevated" className="text-center">
            <div className="space-y-6">
              <Heading level={2} align="center" className="gradient-text">
                {founderSpeech.title}
              </Heading>
              <div className="flex justify-center">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-secondary/50 shadow-glow">
                  <Image
                    src={founderSpeech.avatar}
                    alt={founderSpeech.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              </div>
              <blockquote className="text-lg sm:text-xl text-text-secondary italic leading-relaxed">
                "{founderSpeech.speech}"
              </blockquote>
              <div>
                <p className="font-bold text-lg text-text-primary">{founderSpeech.name}</p>
                <p className="text-sm text-text-tertiary">Founder & Director</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Team Members */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
        
        <div className="relative z-10 space-y-8 sm:space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} align="center" className="gradient-text">
              {team.title}
            </Heading>
            <Text size="base" color="secondary" align="center" className="text-text-secondary">
              Meet the passionate individuals driving Jakarta Party Squad forward
            </Text>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.members.map((member, index) => (
              <Card key={index} hoverable padding="sm" className="group">
                <Link
                  href={member.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block space-y-3"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-surface border border-secondary/10 group-hover:border-secondary/30 transition-all duration-300">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="font-semibold text-text-primary text-sm sm:text-base group-hover:text-secondary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-tertiary line-clamp-2">
                      {member.role}
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
