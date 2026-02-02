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
import { Instagram, Car, Train, Smartphone, Bus, PartyPopper, ArrowRight, Star } from 'lucide-react';

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
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-accent/10 animate-gradient-shift bg-[length:200%_200%]" />
          </div>
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
          
          <Container className="relative z-10">
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={1} align="center" className="w-full mb-0 gradient-text tracking-wide">
                  Nightclub SCBD Jakarta
                </Heading>
                <Text size="xl" className="text-text-secondary text-center w-full">
                  Panduan Lengkap Best Club & Party SCBD 2026
                </Text>
                <Text size="base" className="text-text-tertiary text-center max-w-2xl">
                  SCBD adalah pusat <strong className="text-secondary">nightlife premium Jakarta</strong> dengan 
                  nightclub berkelas internasional. Temukan <strong className="text-accent">party terbaik SCBD</strong> 
                  setiap weekend dengan DJ guest dan event exclusive.
                </Text>
              </div>
            </div>
          </Container>
        </section>

        {/* Top Clubs */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary" />
          
          <Container className="relative z-10">
            <div className="w-full max-w-3xl mx-auto px-4 mb-12">
              <div className="flex flex-col items-center space-y-4">
                <Heading level={2} align="center" className="w-full mb-0 gradient-text">
                  Top 3 Nightclub SCBD Jakarta
                </Heading>
                <Text size="base" className="text-text-secondary text-center w-full">
                  Partner nightclub terbaik Jakarta Party Squad di area SCBD
                </Text>
              </div>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {topClubsSCBD.map((club, index) => (
                <div
                  key={index}
                  className="glass-strong rounded-xl border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-card-hover transition-all duration-500 overflow-hidden hover:-translate-y-1 group"
                >
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* Image */}
                    <div className="relative h-48 md:h-full rounded-lg overflow-hidden border border-secondary/10 group-hover:border-secondary/30 transition-all">
                      <Image
                        src={club.image}
                        alt={`${club.name} - nightclub SCBD Jakarta`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <Heading level={3} className="text-2xl mb-2 gradient-text">
                          {index + 1}. {club.name}
                        </Heading>
                        <Text size="base" className="text-text-secondary">
                          {club.description}
                        </Text>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-t border-secondary/20">
                        <div>
                          <Text size="sm" className="text-text-muted">Rating</Text>
                          <Text size="base" className="font-semibold text-text-primary inline-flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            {club.rating}
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-text-muted">Price Range</Text>
                          <Text size="base" className="font-semibold text-text-primary">
                            {club.priceRange}
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-text-muted">Best Day</Text>
                          <Text size="base" className="font-semibold text-text-primary">
                            {club.bestDay}
                          </Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-text-muted">Location</Text>
                          <Text size="base" className="font-semibold text-secondary">
                            SCBD, Jakarta
                          </Text>
                        </div>
                      </div>

                      <a
                        href={club.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-accent text-bg-primary font-semibold rounded-full hover:shadow-glow transition-all duration-400 hover:-translate-y-0.5"
                      >
                        <Instagram className="w-5 h-5" />
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
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
          
          <Container className="relative z-10">
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center mb-12">
                <Heading level={2} align="center" className="w-full mb-0 gradient-text">
                  Cara ke SCBD Jakarta
                </Heading>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 glass rounded-xl border border-secondary/20 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-1">
                  <div className="mb-3">
                    <Car className="w-8 h-8 text-secondary" />
                  </div>
                  <Heading level={3} className="text-lg mb-2 text-secondary">
                    By Car
                  </Heading>
                  <Text size="sm" className="text-text-tertiary">
                    Akses via Jl. Jenderal Sudirman. Parkir tersedia di basement venue atau parkir umum SCBD.
                  </Text>
                </div>

                <div className="p-6 glass rounded-xl border border-secondary/20 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-1">
                  <div className="mb-3">
                    <Train className="w-8 h-8 text-secondary" />
                  </div>
                  <Heading level={3} className="text-lg mb-2 text-secondary">
                    By MRT
                  </Heading>
                  <Text size="sm" className="text-text-tertiary">
                    MRT Bundaran HI atau MRT Istora Mandiri. Jalan 5-10 menit ke area SCBD nightclub.
                  </Text>
                </div>

                <div className="p-6 glass rounded-xl border border-secondary/20 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-1">
                  <div className="mb-3">
                    <Smartphone className="w-8 h-8 text-secondary" />
                  </div>
                  <Heading level={3} className="text-lg mb-2 text-secondary">
                    By Online Transport
                  </Heading>
                  <Text size="sm" className="text-text-tertiary">
                    Gojek/Grab mudah dijangkau. Drop point di depan venue atau lobby gedung SCBD.
                  </Text>
                </div>

                <div className="p-6 glass rounded-xl border border-secondary/20 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-1">
                  <div className="mb-3">
                    <Bus className="w-8 h-8 text-secondary" />
                  </div>
                  <Heading level={3} className="text-lg mb-2 text-secondary">
                    By TransJakarta
                  </Heading>
                  <Text size="sm" className="text-text-tertiary">
                    Koridor 1 atau 6, turun di Halte Polda Metro Jaya atau Tosari ICBC.
                  </Text>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-accent/20 to-secondary/20 animate-gradient-shift bg-[length:200%_200%]" />
          <div className="absolute inset-0 backdrop-blur-3xl bg-surface/30" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-glow-pulse" />
          
          <Container className="relative z-10">
            <div className="max-w-3xl mx-auto glass-strong rounded-2xl p-8 sm:p-12 border-2 border-secondary/30">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={2} align="center" className="w-full mb-0 gradient-text">
                  Party Gratis di SCBD Jakarta!
                </Heading>
                <Text size="base" className="text-text-secondary text-center max-w-2xl">
                  Ikut hosting crowd Jakarta Party Squad dan nikmati party gratis di nightclub SCBD.
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link
                    href="/hosting/gratis"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary to-accent text-bg-primary font-bold rounded-full hover:shadow-glow-lg transition-all duration-400 hover:-translate-y-1"
                  >
                    <PartyPopper className="w-5 h-5" />
                    Daftar Hosting Gratis
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-secondary text-secondary font-semibold rounded-full hover:bg-secondary/10 transition-all duration-400 hover:-translate-y-1"
                  >
                    Lihat Event SCBD
                    <ArrowRight className="w-5 h-5" />
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
