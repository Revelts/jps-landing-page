/**
 * Locations Preview Section
 * SEO: Internal linking to location pages
 */
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

const locations = [
  {
    name: 'SCBD',
    title: 'Nightlife SCBD',
    description: 'Premium nightclub dengan DJ internasional',
    href: '/nightlife-scbd',
    gradient: 'from-indigo-500 to-purple-600',
    icon: '🏙️',
  },
  {
    name: 'Kemang',
    title: 'Party Kemang',
    description: 'Vibes casual dengan young crowd',
    href: '/nightlife-kemang',
    gradient: 'from-purple-500 to-pink-600',
    icon: '🎭',
  },
  {
    name: 'PIK',
    title: 'Clubbing PIK',
    description: 'Entertainment venue dengan parking luas',
    href: '/nightlife-pik',
    gradient: 'from-blue-500 to-purple-600',
    icon: '🌊',
  },
];

export function LocationsPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="w-full max-w-3xl mx-auto px-4 mb-12">
          <div className="flex flex-col items-center space-y-4">
            <Heading level={2} align="center" className="w-full mb-0">
              Nightlife Jakarta by Area
            </Heading>
            <Text size="lg" className="text-gray-600 text-center w-full max-w-2xl">
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
              <div className={`p-8 bg-gradient-to-br ${location.gradient} rounded-2xl text-white hover:shadow-2xl transition-all transform hover:-translate-y-1`}>
                <div className="text-5xl mb-4">{location.icon}</div>
                <Heading level={3} className="text-white text-2xl mb-2">
                  {location.title}
                </Heading>
                <Text size="base" className="text-white/90 mb-4">
                  {location.description}
                </Text>
                <div className="flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                  <span>Explore {location.name}</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See All Events CTA */}
        <div className="text-center mt-12">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:shadow-lg transition border-2 border-indigo-200"
          >
            Lihat Semua Event Jakarta →
          </Link>
        </div>
      </Container>
    </section>
  );
}
