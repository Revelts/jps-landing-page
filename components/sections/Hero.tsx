/**
 * Hero Section Component
 * Single Responsibility: Display hero section with CTA
 * Mobile-first: Stacked layout on mobile, side-by-side on desktop
 */
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';
import { siteConfig } from '@/lib/config';

export function Hero() {
  const { mainHero } = siteConfig;

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <Heading level={1} className="text-black">
                {mainHero.title}
              </Heading>
              <Text
                size="xl"
                color="tertiary"
                className="font-medium text-primary"
              >
                {mainHero.subtitle}
              </Text>
            </div>

            <Text size="base" color="secondary" className="leading-relaxed">
              {mainHero.description}
            </Text>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={mainHero.primaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none"
              >
                <Button variant="primary" size="lg" fullWidth className="sm:w-auto">
                  {mainHero.primaryAction.text}
                </Button>
              </Link>
              <Link
                href={mainHero.secondaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none"
              >
                <Button variant="outline" size="lg" fullWidth className="sm:w-auto">
                  {mainHero.secondaryAction.text}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-primary">
                  5,000+
                </div>
                <Text size="sm" color="muted">
                  Followers
                </Text>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-primary">
                  2,000+
                </div>
                <Text size="sm" color="muted">
                  Active Members
                </Text>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-64 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={mainHero.img}
              alt="Jakarta Party Squad"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
