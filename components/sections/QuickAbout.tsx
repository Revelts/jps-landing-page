/**
 * Quick About Section Component
 * Single Responsibility: Display quick overview of the organization
 * Mobile-first: Stacked cards on mobile, grid on desktop
 */
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { siteConfig } from '@/lib/config';

export function QuickAbout() {
  const { aboutus } = siteConfig;

  return (
    <Section className="bg-gray-50">
      <div className="space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Heading level={2} align="center">
            {aboutus.title}
          </Heading>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {aboutus.items.slice(0, 2).map((item, index) => (
            <Card key={index} hoverable padding="none" className="overflow-hidden">
              <div className="flex flex-col h-full">
                {/* Image Container - Full width, fixed aspect ratio */}
                <div className="relative w-full aspect-[16/9] bg-gray-100">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>
                
                {/* Content Container - With padding */}
                <div className="flex-1 p-5 sm:p-6 md:p-7 space-y-3 sm:space-y-4">
                  <Heading level={3} className="text-lg sm:text-xl">
                    {item.title}
                  </Heading>
                  <Text size="base" color="secondary">
                    {item.description}
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/about">
            <Button variant="outline" size="lg">
              Learn More About Us
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
