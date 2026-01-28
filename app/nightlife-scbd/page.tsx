/**
 * Nightlife SCBD Jakarta Page
 * Local SEO: Target "nightclub SCBD Jakarta"
 */
import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = genMeta({
  title: 'Nightclub SCBD Jakarta - Best Club & Party Guide 2026 | JPS',
  description: 'Panduan lengkap nightlife SCBD Jakarta! Review nightclub terbaik: Wildout, Bengkel SCBD, Stalk. Jadwal party, DJ guest, tips clubbing SCBD. Update 2026.',
  keywords: 'nightclub SCBD Jakarta, nightlife SCBD, party SCBD Jakarta, club SCBD, best nightclub SCBD, event SCBD Jakarta, clubbing SCBD, entertainment SCBD',
  canonical: '/nightlife-scbd',
});

const topClubsSCBD = [
  {
    name: 'The H Club',
    description: 'Premium nightclub dengan guest DJ internasional. EDM, House, dan vibes terbaik SCBD.',
    image: '/assets/images/theh.png',
    instagram: 'https://www.instagram.com/h.scbd/',
    rating: '4.8/5',
    priceRange: 'Rp 150K - 300K',
    bestDay: 'Friday & Saturday',
  },
  {
    name: 'Bengkel SCBD',
    description: 'Nightclub stylish dengan live music dan DJ performances. Perfect untuk weekend party.',
    image: '/assets/images/bengkel.png',
    instagram: 'https://www.instagram.com/bengkelscbd/',
    rating: '4.7/5',
    priceRange: 'Rp 100K - 250K',
    bestDay: 'Thursday - Saturday',
  },
  {
    name: 'Stalk SCBD',
    description: 'Modern club dengan ambiance premium. Favorite spot untuk networking dan party.',
    image: '/assets/images/stalk.png',
    instagram: 'https://www.instagram.com/stalkjakarta/',
    rating: '4.6/5',
    priceRange: 'Rp 120K - 280K',
    bestDay: 'Friday & Saturday',
  },
];

export default function NightlifeSCBDPage() {
  return (
    <>
      <PageViewTracker pageType="other" pageName="Nightlife SCBD" pageCategory="location" />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-indigo-50 to-white py-16 sm:py-20">
          <Container>
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={1} align="center" className="w-full mb-0">
                  Nightclub SCBD Jakarta
                </Heading>
                <Text size="xl" className="text-gray-600 text-center w-full">
                  Panduan Lengkap Best Club & Party SCBD 2026
                </Text>
                <Text size="base" className="text-gray-700 text-center max-w-2xl">
                  SCBD adalah pusat <strong className="text-black">nightlife premium Jakarta</strong> dengan 
                  nightclub berkelas internasional. Temukan <strong className="text-black">party terbaik SCBD</strong> 
                  setiap weekend dengan DJ guest dan event exclusive.
                </Text>
              </div>
            </div>
          </Container>
        </section>

        {/* Top Clubs */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="w-full max-w-3xl mx-auto px-4 mb-12">
              <div className="flex flex-col items-center space-y-4">
                <Heading level={2} align="center" className="w-full mb-0">
                  Top 3 Nightclub SCBD Jakarta
                </Heading>
                <Text size="base" className="text-gray-600 text-center w-full">
                  Partner nightclub terbaik Jakarta Party Squad di area SCBD
                </Text>
              </div>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {topClubsSCBD.map((club, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition overflow-hidden"
                >
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* Image */}
                    <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                      <Image
                        src={club.image}
                        alt={`${club.name} - nightclub SCBD Jakarta`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <Heading level={3} className="text-2xl mb-2">
                          {index + 1}. {club.name}
                        </Heading>
                        <Text size="base" className="text-gray-700">
                          {club.description}
                        </Text>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
                        <div>
                          <Text size="sm" className="text-gray-500">Rating</Text>
                          <Text size="base" className="font-semibold text-black">
                            ⭐ {club.rating}
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-500">Price Range</Text>
                          <Text size="base" className="font-semibold text-black">
                            {club.priceRange}
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-500">Best Day</Text>
                          <Text size="base" className="font-semibold text-black">
                            {club.bestDay}
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-gray-500">Location</Text>
                          <Text size="base" className="font-semibold text-black">
                            SCBD, Jakarta
                          </Text>
                        </div>
                      </div>

                      <a
                        href={club.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:shadow-lg transition"
                      >
                        <span>📱</span>
                        Follow Instagram
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Location Info */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <Container>
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center mb-12">
                <Heading level={2} align="center" className="w-full mb-0">
                  Cara ke SCBD Jakarta
                </Heading>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-xl border border-gray-200">
                  <div className="text-3xl mb-3">🚗</div>
                  <Heading level={3} className="text-lg mb-2">
                    By Car
                  </Heading>
                  <Text size="sm" className="text-gray-700">
                    Akses via Jl. Jenderal Sudirman. Parkir tersedia di basement venue atau parkir umum SCBD.
                  </Text>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200">
                  <div className="text-3xl mb-3">🚇</div>
                  <Heading level={3} className="text-lg mb-2">
                    By MRT
                  </Heading>
                  <Text size="sm" className="text-gray-700">
                    MRT Bundaran HI atau MRT Istora Mandiri. Jalan 5-10 menit ke area SCBD nightclub.
                  </Text>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200">
                  <div className="text-3xl mb-3">🚕</div>
                  <Heading level={3} className="text-lg mb-2">
                    By Online Transport
                  </Heading>
                  <Text size="sm" className="text-gray-700">
                    Gojek/Grab mudah dijangkau. Drop point di depan venue atau lobby gedung SCBD.
                  </Text>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200">
                  <div className="text-3xl mb-3">🚌</div>
                  <Heading level={3} className="text-lg mb-2">
                    By TransJakarta
                  </Heading>
                  <Text size="sm" className="text-gray-700">
                    Koridor 1 atau 6, turun di Halte Polda Metro Jaya atau Tosari ICBC.
                  </Text>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 sm:p-12 border border-indigo-100">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={2} align="center" className="w-full mb-0">
                  Party Gratis di SCBD Jakarta!
                </Heading>
                <Text size="base" className="text-gray-700 text-center max-w-2xl">
                  Ikut hosting crowd Jakarta Party Squad dan nikmati party gratis di nightclub SCBD.
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link
                    href="/hosting/gratis"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl transition"
                  >
                    Daftar Hosting Gratis 🎊
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition"
                  >
                    Lihat Event SCBD →
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
