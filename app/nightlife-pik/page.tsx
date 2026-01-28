/**
 * Nightlife PIK Jakarta Page
 * Local SEO: Target "nightclub PIK Jakarta"
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
  title: 'Nightclub PIK Jakarta - Best Party Venue & Entertainment 2026 | JPS',
  description: 'Panduan nightlife PIK Jakarta! Review nightclub & entertainment venue terbaik di Pantai Indah Kapuk. Jadwal party, DJ performances, tips clubbing PIK. Update 2026.',
  keywords: 'nightclub PIK Jakarta, nightlife PIK, party PIK Jakarta, club PIK, entertainment PIK, best nightclub PIK, event PIK Jakarta, clubbing PIK, Pantai Indah Kapuk nightlife',
  canonical: '/nightlife-pik',
});

const topClubsPIK = [
  {
    name: 'Blackowl PIK',
    description: 'Premium nightclub dengan konsep modern dan DJ performances berkelas. Best nightlife spot di PIK.',
    image: '/assets/images/blackowl.png',
    instagram: 'https://www.instagram.com/blackowl.jkt/',
    rating: '4.7/5',
    priceRange: 'Rp 120K - 250K',
    bestDay: 'Friday & Saturday',
  }
];

export default function NightlifePIKPage() {
  return (
    <>
      <PageViewTracker pageType="other" pageName="Nightlife PIK" pageCategory="location" />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-20">
          <Container>
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={1} align="center" className="w-full mb-0">
                  Nightclub PIK Jakarta
                </Heading>
                <Text size="xl" className="text-gray-600 text-center w-full">
                  Best Party Venue & Entertainment Pantai Indah Kapuk 2026
                </Text>
                <Text size="base" className="text-gray-700 text-center max-w-2xl">
                  PIK (Pantai Indah Kapuk) adalah destinasi <strong className="text-black">nightlife Jakarta Utara</strong> dengan 
                  venue entertainment modern dan crowd diverse. Nikmati <strong className="text-black">party PIK</strong> 
                  dengan suasana lebih relax dan parking lebih luas.
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
                  Top Nightclub PIK Jakarta
                </Heading>
                <Text size="base" className="text-gray-600 text-center w-full">
                  Partner nightclub Jakarta Party Squad di area PIK
                </Text>
              </div>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {topClubsPIK.map((club, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition overflow-hidden"
                >
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* Image */}
                    <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                      <Image
                        src={club.image}
                        alt={`${club.name} - nightclub PIK Jakarta`}
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
                            PIK, Jakarta Utara
                          </Text>
                        </div>
                      </div>

                      <a
                        href={club.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full hover:shadow-lg transition"
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

        {/* Why PIK */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <Container>
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center mb-12">
                <Heading level={2} align="center" className="w-full mb-0">
                  Kenapa Party di PIK?
                </Heading>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                  <div className="text-4xl mb-4">🚗</div>
                  <Heading level={3} className="text-lg mb-2">
                    Easy Parking
                  </Heading>
                  <Text size="sm" className="text-gray-700">
                    Parkir luas dan mudah. Gak perlu pusing cari parkir seperti di SCBD.
                  </Text>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                  <div className="text-4xl mb-4">🌊</div>
                  <Heading level={3} className="text-lg mb-2">
                    Beach Vibes
                  </Heading>
                  <Text size="sm" className="text-gray-700">
                    Dekat pantai, suasana lebih fresh. Perfect untuk pre-party dinner.
                  </Text>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <Heading level={3} className="text-lg mb-2">
                    Less Crowded
                  </Heading>
                  <Text size="sm" className="text-gray-700">
                    Lebih spacious, gak se-packed SCBD. Enjoy party dengan lebih comfortable.
                  </Text>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 sm:p-12 border border-blue-100">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={2} align="center" className="w-full mb-0">
                  Party Gratis di PIK Jakarta!
                </Heading>
                <Text size="base" className="text-gray-700 text-center max-w-2xl">
                  Ikut hosting crowd dan nikmati party gratis di nightclub PIK setiap weekend.
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link
                    href="/hosting/gratis"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl transition"
                  >
                    Daftar Hosting Gratis 🎊
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition"
                  >
                    Lihat Event PIK →
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
