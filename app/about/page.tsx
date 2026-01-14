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
      <Section className="bg-gradient-to-b from-primary-50 to-white pt-24 sm:pt-28">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Heading level={1} align="center">
            About Jakarta Party Squad
          </Heading>
          <Text size="lg" color="secondary" align="center">
            More than just a party - we're a community, a media platform, and your event partner.
          </Text>
        </div>
      </Section>

      {/* Our Story */}
      <Section>
        <div className="space-y-8">
          {aboutus.items.map((item, index) => (
            <Card key={index} className="overflow-hidden p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Content */}
                <div className={`p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-center space-y-4 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Heading level={2} className="text-xl sm:text-2xl">
                    {item.title}
                  </Heading>
                  <Text size="base" color="secondary">
                    {item.description}
                  </Text>
                </div>
                
                {/* Image */}
                <div className={`relative h-64 sm:h-80 lg:h-full min-h-[300px] bg-gray-100 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Founder Speech */}
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <div className="space-y-6">
              <Heading level={2} align="center">
                {founderSpeech.title}
              </Heading>
              <div className="flex justify-center">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary shadow-xl">
                  <Image
                    src={founderSpeech.avatar}
                    alt={founderSpeech.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              </div>
              <blockquote className="text-lg sm:text-xl text-gray-700 italic leading-relaxed">
                "{founderSpeech.speech}"
              </blockquote>
              <div>
                <p className="font-bold text-lg text-gray-900">{founderSpeech.name}</p>
                <p className="text-sm text-gray-500">Founder & Director</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Team Members */}
      <Section>
        <div className="space-y-8 sm:space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} align="center">
              {team.title}
            </Heading>
            <Text size="base" color="secondary" align="center">
              Meet the passionate individuals driving Jakarta Party Squad forward
            </Text>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.members.map((member, index) => (
              <Card key={index} hover clickable>
                <Link
                  href={member.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block space-y-3"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
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
