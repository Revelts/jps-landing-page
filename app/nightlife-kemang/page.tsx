/**
 * Nightlife Kemang Jakarta Page
 * Local SEO: Target "nightclub Kemang Jakarta"
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
  title: 'Nightclub Kemang Jakarta - Best Party Spot & Bar Guide 2026 | JPS',
  description: 'Panduan nightlife Kemang Jakarta! Review club & bar terbaik: Fyne, Anak Kemang, Beer Barrel. Jadwal party, vibes casual, young crowd. Update 2026.',
  keywords: 'nightclub Kemang Jakarta, nightlife Kemang, party Kemang Jakarta, bar Kemang, club Kemang, best nightclub Kemang, event Kemang Jakarta, clubbing Kemang',
  canonical: '/nightlife-kemang',
});

const topClubsKemang = [
  {
    name: 'Fyne Jakarta',
    description: 'Nightclub dengan vibes casual dan crowd muda. Perfect untuk networking dan party santai.',
    image: '/assets/images/fyne.png',
    instagram: 'https://www.instagram.com/fynejakarta/',
    rating: '4.7/5',
    priceRange: 'Rp 80K - 200K',
    bestDay: 'Thursday - Saturday',
  },
  {
    name: 'Anak Kemang',
    description: 'Bar & club dengan konsep casual dining. Great food, good music, awesome vibes.',
    image: '/assets/images/akem.png',
    instagram: 'https://www.instagram.com/anak_kemang_cafe/',
    rating: '4.6/5',
    priceRange: 'Rp 50K - 150K',
    bestDay: 'Wednesday - Saturday',
  },
  {
    name: 'Beer Barrel Kemang',
    description: 'Sports bar dengan live music. Casual atmosphere, great untuk hang out sebelum clubbing.',
    image: '/assets/images/beerbarrel.png',
    instagram: 'https://www.instagram.com/beerbarrelkemangjakarta/',
    rating: '4.5/5',
    priceRange: 'Rp 50K - 120K',
    bestDay: 'Friday & Saturday',
  },
];

export default function NightlifeKemangPage() {
  return (
    <>
      <PageViewTracker pageType="other" pageName="Nightlife Kemang" pageCategory="location" />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-purple-50 to-white py-16 sm:py-20">
          <Container>
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={1} align="center" className="w-full mb-0">
                  Nightclub Kemang Jakarta
                </Heading>
                <Text size="xl" className="text-gray-600 text-center w-full">
                  Best Party Spot & Bar Guide 2026
                </Text>
                <Text size="base" className="text-gray-700 text-center max-w-2xl">
                  Kemang adalah zona <strong className="text-black">nightlife casual Jakarta</strong> dengan 
                  vibes muda dan friendly. Perfect untuk hang out, party santai, dan networking dalam 
                  suasana yang lebih relax dibanding SCBD.
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
                  Top 3 Nightclub & Bar Kemang Jakarta
                </Heading>
                <Text size="base" className="text-gray-600 text-center w-full">
                  Rekomendasi venue terbaik di Kemang untuk party dan hang out
                </Text>
              </div>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {topClubsKemang.map((club, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition overflow-hidden"
                >
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* Image */}
                    <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                      <Image
                        src={club.image}
                        alt={`${club.name} - nightclub Kemang Jakarta`}
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
                          <Text size="sm" className="text-gray-500">Area</Text>
                          <Text size="base" className="font-semibold text-black">
                            Kemang, Jakarta
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

        {/* Why Kemang */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <Container>
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center mb-12">
                <Heading level={2} align="center" className="w-full mb-0">
                  Kenapa Party di Kemang?
                </Heading>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                  <div className="text-4xl mb-4">👥</div>
                  <Heading level={3} className="text-lg mb-2">
                    Vibes Casual
                  </Heading>
                  <Text size="sm" className="text-gray-700">
                    Lebih santai dibanding SCBD, perfect untuk yang mau enjoy tanpa pressure.
                  </Text>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                  <div className="text-4xl mb-4">💰</div>
                  <Heading level={3} className="text-lg mb-2">
                    Budget Friendly
                  </Heading>
                  <Text size="sm" className="text-gray-700">
                    Entry dan drinks lebih affordable. Cocok untuk young professionals.
                  </Text>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
                  <div className="text-4xl mb-4">🎵</div>
                  <Heading level={3} className="text-lg mb-2">
                    Diverse Music
                  </Heading>
                  <Text size="sm" className="text-gray-700">
                    EDM, Hip-Hop, R&B, House - ada semua! Venue bervariasi sesuai taste.
                  </Text>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 sm:p-12 border border-purple-100">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={2} align="center" className="w-full mb-0">
                  Party Gratis di Kemang Jakarta!
                </Heading>
                <Text size="base" className="text-gray-700 text-center max-w-2xl">
                  Join hosting crowd dan nikmati party gratis di nightclub Kemang setiap weekend.
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link
                    href="/hosting/gratis"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl transition"
                  >
                    Daftar Hosting Gratis 🎊
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition"
                  >
                    Lihat Event Kemang →
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
