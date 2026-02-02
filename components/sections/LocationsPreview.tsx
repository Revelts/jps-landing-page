/**
 * Locations Preview Section
 * SEO: Internal linking to location pages
 */
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Building2, Music, Waves, ArrowRight } from 'lucide-react';

const locations = [
  {
    name: 'SCBD',
    title: 'Nightlife SCBD',
    description: 'Premium nightclub dengan DJ internasional',
    href: '/nightlife-scbd',
    gradient: 'from-secondary to-accent',
    icon: Building2,
  },
  {
    name: 'Kemang',
    title: 'Party Kemang',
    description: 'Vibes casual dengan young crowd',
    href: '/nightlife-kemang',
    gradient: 'from-accent to-secondary',
    icon: Music,
  },
  {
    name: 'PIK',
    title: 'Clubbing PIK',
    description: 'Entertainment venue dengan parking luas',
    href: '/nightlife-pik',
    gradient: 'from-secondary via-accent to-secondary',
    icon: Waves,
  },
];

export function LocationsPreview() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
      
      <Container className="relative z-10">
        <div className="w-full max-w-3xl mx-auto px-4 mb-12">
          <div className="flex flex-col items-center space-y-4">
            <Heading level={2} align="center" className="w-full mb-0 gradient-text tracking-wide">
              Nightlife Jakarta by Area
            </Heading>
            <Text size="lg" className="text-text-secondary text-center w-full max-w-2xl">
              Explore nightclub dan party scene terbaik di berbagai area Jakarta
            </Text>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {locations.map((location) => (
            <Link
              key={location.href}
              href={location.href}
              className="group"
            >
              <div className={`p-8 bg-gradient-to-br ${location.gradient} rounded-2xl hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden`}>
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-surface/20 backdrop-blur-sm" />
                
                <div className="relative z-10">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    <location.icon className="w-12 h-12 text-bg-primary" />
                  </div>
                  <Heading level={3} className="text-bg-primary text-2xl mb-2 font-bold tracking-wide">
                    {location.title}
                  </Heading>
                  <Text size="base" className="text-bg-primary/80 mb-4">
                    {location.description}
                  </Text>
                  <div className="flex items-center gap-2 text-bg-primary font-semibold group-hover:gap-3 transition-all">
                    <span>Explore {location.name}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See All Events CTA */}
        <div className="text-center mt-12">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-8 py-4 bg-surface/50 backdrop-blur-md text-secondary font-semibold rounded-full hover:shadow-glow-sm transition-all duration-400 border-2 border-secondary/30 hover:border-secondary hover:-translate-y-1"
          >
            Lihat Semua Event Jakarta →
          </Link>
        </div>
      </Container>
    </section>
  );
}
