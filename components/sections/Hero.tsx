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
                Komunitas Nightlife & Party Terbesar Jakarta
              </Heading>
              <Text
                size="xl"
                className="font-semibold text-indigo-600"
              >
                Event Gratis • Networking • Entertainment
              </Text>
            </div>

            <Text size="base" className="leading-relaxed text-gray-700">
              <strong className="text-black">Jakarta Party Squad</strong> adalah komunitas nightlife dan party terbesar di Jakarta dengan 1,000+ members aktif. 
              Nikmati <strong className="text-black">hosting party gratis</strong> di nightclub SCBD, Kemang, dan PIK setiap weekend. 
              Akses event eksklusif, networking premium, dan rasakan <strong className="text-black">nightlife Jakarta</strong> yang berbeda!
            </Text>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/hosting/gratis" className="flex-1 sm:flex-none">
                <Button variant="primary" size="lg" fullWidth className="sm:w-auto">
                  🎊 Ikut Party Gratis
                </Button>
              </Link>
              <Link
                href={mainHero.secondaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none"
              >
                <Button variant="outline" size="lg" fullWidth className="sm:w-auto">
                  Join Komunitas 🚀
                </Button>
              </Link>
            </div>

            {/* Stats - Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600">
                  1,000+
                </div>
                <Text size="sm" className="text-gray-600">
                  Members
                </Text>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600">
                  50+
                </div>
                <Text size="sm" className="text-gray-600">
                  Events/Bulan
                </Text>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600">
                  20+
                </div>
                <Text size="sm" className="text-gray-600">
                  Nightclub Partner
                </Text>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600">
                  2023
                </div>
                <Text size="sm" className="text-gray-600">
                  Sejak
                </Text>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-64 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={mainHero.img}
              alt="Jakarta Party Squad - Komunitas nightlife dan party terbesar Jakarta di event nightclub"
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
