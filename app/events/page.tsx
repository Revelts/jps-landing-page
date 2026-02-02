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
import { Calendar, PartyPopper, Headphones, Music } from 'lucide-react';

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
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-accent/10 animate-gradient-shift bg-[length:200%_200%]" />
          </div>
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
          
          <Container className="relative z-10">
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={1} align="center" className="w-full mb-0 gradient-text tracking-wide">
                  Event Party Jakarta 2026
                </Heading>
                <Text size="xl" className="text-text-secondary text-center w-full">
                  Jadwal Lengkap Nightclub & Festival Musik Se-Jakarta
                </Text>
                <Text size="base" className="text-text-tertiary text-center max-w-2xl">
                  Temukan event party terbaik di seluruh Jakarta! Update real-time setiap hari dengan 
                  jadwal nightclub di <strong className="text-secondary">SCBD, Kemang, PIK, Senopati, Blok M, 
                  Kuningan, Menteng</strong>, dan area nightlife lainnya. Plus festival musik elektronik terbaru!
                </Text>
              </div>
            </div>
          </Container>
        </section>

        {/* External Calendar */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary" />
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="glass-strong rounded-2xl p-8 sm:p-12 border-2 border-secondary/20 shadow-glass hover:border-secondary/40 transition-all duration-500">
                {/* Content - Perfectly Centered */}
                <div className="w-full flex flex-col items-center">
                  {/* Icon */}
                  <div className="mb-6">
                    <Calendar className="w-16 h-16 text-secondary" />
                  </div>
                  
                  {/* Title & Description Group */}
                  <div className="flex flex-col items-center space-y-4 mb-12">
                    <Heading level={2} align="center" className="w-full mb-0 gradient-text">
                      Calendar Event Party Jakarta
                    </Heading>
                    
                    <Text size="lg" className="text-text-secondary text-center w-full max-w-2xl">
                      Jadwal lengkap party di semua nightclub Jakarta! Update setiap hari untuk SCBD, Kemang, 
                      PIK, Senopati, Blok M, dan seluruh venue nightlife Jakarta.
                    </Text>
                  </div>
                  
                  {/* CTA Button */}
                  <a
                    href="https://schedule.jakartapartysquad.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary to-accent text-bg-primary font-bold rounded-full hover:shadow-glow-lg transition-all duration-400 text-base sm:text-lg mb-12 hover:-translate-y-1"
                  >
                    <PartyPopper className="w-5 h-5" />
                    Buka Event Calendar
                  </a>
                </div>

                {/* Quick Stats - Perfect Alignment */}
                <div className="w-full pt-8 border-t border-secondary/20">
                  <div className="grid grid-cols-3 gap-6 sm:gap-12">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">50+</div>
                      <div className="text-xs sm:text-sm text-text-tertiary text-center whitespace-nowrap">Events/Bulan</div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">30+</div>
                      <div className="text-xs sm:text-sm text-text-tertiary text-center whitespace-nowrap">Nightclub Partners</div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">7</div>
                      <div className="text-xs sm:text-sm text-text-tertiary text-center whitespace-nowrap">Area Jakarta</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Event Categories */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
          
          <Container className="relative z-10">
            {/* Section Header */}
            <div className="w-full max-w-3xl mx-auto px-4 mb-12">
              <div className="flex flex-col items-center space-y-4">
                <Heading level={2} align="center" className="w-full mb-0 gradient-text">
                  Jenis Event Party di Jakarta
                </Heading>
                <Text size="base" className="text-text-secondary text-center w-full">
                  Dari nightclub premium hingga festival musik outdoor - temukan event yang cocok untuk kamu!
                </Text>
              </div>
            </div>

            {/* Category Cards - Equal Height */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="flex flex-col items-center p-6 glass rounded-xl border border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-500 hover:-translate-y-1">
                <div className="mb-4">
                  <Headphones className="w-10 h-10 text-secondary" />
                </div>
                <Heading level={3} align="center" className="text-xl mb-3 text-secondary">
                  Nightclub Party
                </Heading>
                <Text size="sm" className="text-text-tertiary text-center flex-1">
                  Party setiap malam di nightclub premium Jakarta - SCBD, Kemang, PIK, Senopati, 
                  Blok M, Kuningan. Guest DJ lokal & internasional setiap weekend!
                </Text>
              </div>

              <div className="flex flex-col items-center p-6 glass rounded-xl border border-secondary/20 hover:border-accent/40 hover:shadow-glow-purple-sm transition-all duration-500 hover:-translate-y-1">
                <div className="mb-4">
                  <Music className="w-10 h-10 text-accent" />
                </div>
                <Heading level={3} align="center" className="text-xl mb-3 text-accent">
                  Festival Musik
                </Heading>
                <Text size="sm" className="text-text-tertiary text-center flex-1">
                  Festival musik elektronik, EDM, techno, house, dan hip-hop. Live performance 
                  dari artis top Indonesia & mancanegara di venue outdoor & indoor Jakarta.
                </Text>
              </div>

              <div className="flex flex-col items-center p-6 glass rounded-xl border border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-500 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
                <div className="mb-4">
                  <PartyPopper className="w-10 h-10 text-secondary" />
                </div>
                <Heading level={3} align="center" className="text-xl mb-3 gradient-text">
                  Party Gratis Jakarta
                </Heading>
                <Text size="sm" className="text-text-tertiary text-center flex-1">
                  Program hosting crowd gratis di seluruh nightclub Jakarta! Free entry, 
                  complimentary drinks, VIP table. Party tanpa bayar setiap weekend.
                </Text>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-accent/20 to-secondary/20 animate-gradient-shift bg-[length:200%_200%]" />
          <div className="absolute inset-0 backdrop-blur-3xl bg-surface/30" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
          
          <Container className="relative z-10">
            <div className="w-full max-w-3xl mx-auto px-4">
              <div className="flex flex-col items-center space-y-8">
                <Heading level={2} align="center" className="text-text-primary w-full mb-0 tracking-wide">
                  Mau Party Gratis di Nightclub Jakarta?
                </Heading>
                <Text size="lg" className="text-text-secondary text-center w-full max-w-2xl">
                  Gabung program <strong className="text-secondary">hosting crowd</strong> dan nikmati party gratis 
                  di nightclub SCBD, Kemang, PIK, Senopati setiap weekend! Free entry, complimentary drinks, 
                  VIP table untuk kamu dan teman-teman.
                </Text>
                <Link
                  href="/hosting/gratis"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary to-accent text-bg-primary font-bold rounded-full hover:shadow-glow-lg transition-all duration-400 text-base sm:text-lg hover:-translate-y-1"
                >
                  <PartyPopper className="w-5 h-5" />
                  Daftar Hosting Gratis Sekarang
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
