/**
 * Events Page
 * SEO: Event party Jakarta calendar
 */
import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import Link from 'next/link';

export const metadata: Metadata = genMeta({
  title: 'Event Party Jakarta 2026 - Jadwal Lengkap Nightclub & Festival Musik',
  description: 'Jadwal event party Jakarta terlengkap setiap hari! Nightclub SCBD, Kemang, PIK, Senopati, Blok M. Guest DJ internasional, party gratis, festival musik elektronik. Update real-time 24/7. Usia 18+',
  keywords: 'event party Jakarta, jadwal party Jakarta, nightclub Jakarta, event SCBD, party Kemang, event PIK, party Senopati, event Blok M, festival musik Jakarta, event weekend Jakarta, jadwal club Jakarta, party malam Jakarta',
  canonical: '/events',
});

export default function EventsPage() {
  return (
    <>
      <PageViewTracker pageType="other" pageName="Events" pageCategory="events" />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-purple-50 to-white py-16 sm:py-20">
          <Container>
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={1} align="center" className="w-full mb-0">
                  Event Party Jakarta 2026
                </Heading>
                <Text size="xl" className="text-gray-600 text-center w-full">
                  Jadwal Lengkap Nightclub & Festival Musik Se-Jakarta
                </Text>
                <Text size="base" className="text-gray-700 text-center max-w-2xl">
                  Temukan event party terbaik di seluruh Jakarta! Update real-time setiap hari dengan 
                  jadwal nightclub di <strong className="text-black">SCBD, Kemang, PIK, Senopati, Blok M, 
                  Kuningan, Menteng</strong>, dan area nightlife lainnya. Plus festival musik elektronik terbaru!
                </Text>
              </div>
            </div>
          </Container>
        </section>

        {/* External Calendar */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-8 sm:p-12 border border-indigo-100 shadow-lg">
                {/* Content - Perfectly Centered */}
                <div className="w-full flex flex-col items-center">
                  {/* Icon */}
                  <span className="text-6xl mb-6">📅</span>
                  
                  {/* Title & Description Group */}
                  <div className="flex flex-col items-center space-y-4 mb-12">
                    <Heading level={2} align="center" className="w-full mb-0">
                      Calendar Event Party Jakarta
                    </Heading>
                    
                    <Text size="lg" className="text-gray-600 text-center w-full max-w-2xl">
                      Jadwal lengkap party di semua nightclub Jakarta! Update setiap hari untuk SCBD, Kemang, 
                      PIK, Senopati, Blok M, dan seluruh venue nightlife Jakarta.
                    </Text>
                  </div>
                  
                  {/* CTA Button */}
                  <a
                    href="https://schedule.jakartapartysquad.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl transition text-base sm:text-lg mb-12"
                  >
                    Buka Event Calendar 🎉
                  </a>
                </div>

                {/* Quick Stats - Perfect Alignment */}
                <div className="w-full pt-8 border-t border-indigo-200">
                  <div className="grid grid-cols-3 gap-6 sm:gap-12">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600">50+</div>
                      <div className="text-xs sm:text-sm text-gray-600 text-center whitespace-nowrap">Events/Bulan</div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600">30+</div>
                      <div className="text-xs sm:text-sm text-gray-600 text-center whitespace-nowrap">Nightclub Partners</div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600">7</div>
                      <div className="text-xs sm:text-sm text-gray-600 text-center whitespace-nowrap">Area Jakarta</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Event Categories */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <Container>
            {/* Section Header */}
            <div className="w-full max-w-3xl mx-auto px-4 mb-12">
              <div className="flex flex-col items-center space-y-4">
                <Heading level={2} align="center" className="w-full mb-0">
                  Jenis Event Party di Jakarta
                </Heading>
                <Text size="base" className="text-gray-600 text-center w-full">
                  Dari nightclub premium hingga festival musik outdoor - temukan event yang cocok untuk kamu!
                </Text>
              </div>
            </div>

            {/* Category Cards - Equal Height */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition">
                <span className="text-4xl mb-4">🎧</span>
                <Heading level={3} align="center" className="text-xl mb-3">
                  Nightclub Party
                </Heading>
                <Text size="sm" className="text-gray-700 text-center flex-1">
                  Party setiap malam di nightclub premium Jakarta - SCBD, Kemang, PIK, Senopati, 
                  Blok M, Kuningan. Guest DJ lokal & internasional setiap weekend!
                </Text>
              </div>

              <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition">
                <span className="text-4xl mb-4">🎪</span>
                <Heading level={3} align="center" className="text-xl mb-3">
                  Festival Musik
                </Heading>
                <Text size="sm" className="text-gray-700 text-center flex-1">
                  Festival musik elektronik, EDM, techno, house, dan hip-hop. Live performance 
                  dari artis top Indonesia & mancanegara di venue outdoor & indoor Jakarta.
                </Text>
              </div>

              <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-pink-300 hover:shadow-lg transition sm:col-span-2 lg:col-span-1">
                <span className="text-4xl mb-4">🎊</span>
                <Heading level={3} align="center" className="text-xl mb-3">
                  Party Gratis Jakarta
                </Heading>
                <Text size="sm" className="text-gray-700 text-center flex-1">
                  Program hosting crowd gratis di seluruh nightclub Jakarta! Free entry, 
                  complimentary drinks, VIP table. Party tanpa bayar setiap weekend.
                </Text>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
          <Container>
            <div className="w-full max-w-3xl mx-auto px-4">
              <div className="flex flex-col items-center space-y-8">
                <Heading level={2} align="center" className="text-white w-full mb-0">
                  Mau Party Gratis di Nightclub Jakarta?
                </Heading>
                <Text size="lg" className="text-white/90 text-center w-full max-w-2xl">
                  Gabung program <strong className="text-white">hosting crowd</strong> dan nikmati party gratis 
                  di nightclub SCBD, Kemang, PIK, Senopati setiap weekend! Free entry, complimentary drinks, 
                  VIP table untuk kamu dan teman-teman.
                </Text>
                <Link
                  href="/hosting/gratis"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition text-base sm:text-lg shadow-xl"
                >
                  🎊 Daftar Hosting Gratis Sekarang
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
