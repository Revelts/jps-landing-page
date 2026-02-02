/**
 * Hero Section Component
 * Single Responsibility: Display hero section with CTA
 * Mobile-first: Stacked layout on mobile, side-by-side on desktop
 */
import Image from 'next/image';
import Link from 'next/link';
import { PartyPopper, Rocket } from 'lucide-react';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';
import { siteConfig } from '@/lib/config';

export function Hero() {
  const { mainHero } = siteConfig;

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-accent/10 animate-gradient-shift bg-[length:200%_200%]" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="space-y-4">
              <Heading level={1} className="text-text-primary tracking-wide">
                Komunitas Nightlife & Party Terbesar Jakarta
              </Heading>
              <div className="flex flex-wrap gap-3">
                <span className="badge-cyber">Event Gratis</span>
                <span className="badge-cyber">Networking</span>
                <span className="badge-cyber">Entertainment</span>
              </div>
            </div>

            <Text size="base" className="leading-relaxed text-text-secondary">
              <strong className="gradient-text font-semibold">Jakarta Party Squad</strong> adalah komunitas nightlife dan party terbesar di Jakarta dengan 1,000+ members aktif. 
              Nikmati <strong className="text-secondary">hosting party gratis</strong> di nightclub SCBD, Kemang, dan PIK setiap weekend. 
              Akses event eksklusif, networking premium, dan rasakan <strong className="text-accent">nightlife Jakarta</strong> yang berbeda!
            </Text>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/hosting/gratis" className="flex-1 sm:flex-none">
                <Button variant="primary" size="lg" fullWidth className="sm:w-auto inline-flex items-center justify-center gap-2">
                  <PartyPopper className="w-5 h-5" />
                  Ikut Party Gratis
                </Button>
              </Link>
              <Link
                href={mainHero.secondaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none"
              >
                <Button variant="outline" size="lg" fullWidth className="sm:w-auto inline-flex items-center justify-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Join Komunitas
                </Button>
              </Link>
            </div>

            {/* Stats - Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4">
              <div className="space-y-1 p-4 rounded-lg bg-surface/30 backdrop-blur-sm border border-secondary/10 hover:border-secondary/30 transition-all duration-300 group">
                <div className="text-2xl sm:text-3xl font-bold gradient-text group-hover:glow-text-blue">
                  1,000+
                </div>
                <Text size="sm" className="text-text-tertiary">
                  Members
                </Text>
              </div>
              <div className="space-y-1 p-4 rounded-lg bg-surface/30 backdrop-blur-sm border border-secondary/10 hover:border-secondary/30 transition-all duration-300 group">
                <div className="text-2xl sm:text-3xl font-bold gradient-text group-hover:glow-text-blue">
                  50+
                </div>
                <Text size="sm" className="text-text-tertiary">
                  Events/Bulan
                </Text>
              </div>
              <div className="space-y-1 p-4 rounded-lg bg-surface/30 backdrop-blur-sm border border-secondary/10 hover:border-secondary/30 transition-all duration-300 group">
                <div className="text-2xl sm:text-3xl font-bold gradient-text group-hover:glow-text-blue">
                  20+
                </div>
                <Text size="sm" className="text-text-tertiary">
                  Nightclub Partner
                </Text>
              </div>
              <div className="space-y-1 p-4 rounded-lg bg-surface/30 backdrop-blur-sm border border-secondary/10 hover:border-secondary/30 transition-all duration-300 group">
                <div className="text-2xl sm:text-3xl font-bold gradient-text group-hover:glow-text-blue">
                  2023
                </div>
                <Text size="sm" className="text-text-tertiary">
                  Sejak
                </Text>
              </div>
            </div>
          </div>

          {/* Image with Premium Frame */}
          <div className="relative h-64 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-glass border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-500 hover:shadow-card-hover group">
            <Image
              src={mainHero.img}
              alt="Jakarta Party Squad - Komunitas nightlife dan party terbesar Jakarta di event nightclub"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            />
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
