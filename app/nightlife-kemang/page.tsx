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
import { Instagram, PartyPopper, ArrowRight, Star, Users, Wallet, Music2 } from 'lucide-react';

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
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-secondary/10 animate-gradient-shift bg-[length:200%_200%]" />
          </div>
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
          
          <Container className="relative z-10">
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={1} align="center" className="w-full mb-0 gradient-text tracking-wide">
                  Nightclub Kemang Jakarta
                </Heading>
                <Text size="xl" className="text-text-secondary text-center w-full">
                  Best Party Spot & Bar Guide 2026
                </Text>
                <Text size="base" className="text-text-tertiary text-center max-w-2xl">
                  Kemang adalah zona <strong className="text-secondary">nightlife casual Jakarta</strong> dengan 
                  vibes muda dan friendly. Perfect untuk hang out, party santai, dan networking dalam 
                  suasana yang lebih relax dibanding SCBD.
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
                  Top 3 Nightclub & Bar Kemang Jakarta
                </Heading>
                <Text size="base" className="text-text-secondary text-center w-full">
                  Rekomendasi venue terbaik di Kemang untuk party dan hang out
                </Text>
              </div>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {topClubsKemang.map((club, index) => (
                <div
                  key={index}
                  className="glass-strong rounded-xl border-2 border-accent/20 hover:border-accent/40 hover:shadow-glow-purple transition-all duration-500 overflow-hidden hover:-translate-y-1 group"
                >
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* Image */}
                    <div className="relative h-48 md:h-full rounded-lg overflow-hidden border border-accent/10 group-hover:border-accent/30 transition-all">
                      <Image
                        src={club.image}
                        alt={`${club.name} - nightclub Kemang Jakarta`}
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

                      <div className="grid grid-cols-2 gap-4 py-4 border-t border-accent/20">
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
                          <Text size="sm" className="text-text-muted">Area</Text>
                          <Text size="base" className="font-semibold text-accent">
                            Kemang, Jakarta
                          </Text>
                        </div>
                      </div>

                      <a
                        href={club.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-bg-primary font-semibold rounded-full hover:shadow-glow-purple transition-all duration-400 hover:-translate-y-0.5"
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

        {/* Why Kemang */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
          
          <Container className="relative z-10">
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center mb-12">
                <Heading level={2} align="center" className="w-full mb-0 gradient-text">
                  Kenapa Party di Kemang?
                </Heading>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 glass rounded-xl border border-secondary/20 hover:border-secondary/30 transition-all duration-500 text-center hover:-translate-y-1">
                  <div className="mb-4 flex justify-center">
                    <Users className="w-10 h-10 text-secondary" />
                  </div>
                  <Heading level={3} className="text-lg mb-2 text-secondary">
                    Vibes Casual
                  </Heading>
                  <Text size="sm" className="text-text-tertiary">
                    Lebih santai dibanding SCBD, perfect untuk yang mau enjoy tanpa pressure.
                  </Text>
                </div>

                <div className="p-6 glass rounded-xl border border-accent/20 hover:border-accent/30 transition-all duration-500 text-center hover:-translate-y-1">
                  <div className="mb-4 flex justify-center">
                    <Wallet className="w-10 h-10 text-accent" />
                  </div>
                  <Heading level={3} className="text-lg mb-2 text-accent">
                    Budget Friendly
                  </Heading>
                  <Text size="sm" className="text-text-tertiary">
                    Entry dan drinks lebih affordable. Cocok untuk young professionals.
                  </Text>
                </div>

                <div className="p-6 glass rounded-xl border border-secondary/20 hover:border-secondary/30 transition-all duration-500 text-center hover:-translate-y-1">
                  <div className="mb-4 flex justify-center">
                    <Music2 className="w-10 h-10 text-secondary" />
                  </div>
                  <Heading level={3} className="text-lg mb-2 text-secondary">
                    Diverse Music
                  </Heading>
                  <Text size="sm" className="text-text-tertiary">
                    EDM, Hip-Hop, R&B, House - ada semua! Venue bervariasi sesuai taste.
                  </Text>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-secondary/20 to-accent/20 animate-gradient-shift bg-[length:200%_200%]" />
          <div className="absolute inset-0 backdrop-blur-3xl bg-surface/30" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
          
          <Container className="relative z-10">
            <div className="max-w-3xl mx-auto glass-strong rounded-2xl p-8 sm:p-12 border-2 border-accent/30">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={2} align="center" className="w-full mb-0 gradient-text">
                  Party Gratis di Kemang Jakarta!
                </Heading>
                <Text size="base" className="text-text-secondary text-center max-w-2xl">
                  Join hosting crowd dan nikmati party gratis di nightclub Kemang setiap weekend.
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link
                    href="/hosting/gratis"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-bg-primary font-bold rounded-full hover:shadow-glow-purple-lg transition-all duration-400 hover:-translate-y-1"
                  >
                    <PartyPopper className="w-5 h-5" />
                    Daftar Hosting Gratis
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent/10 transition-all duration-400 hover:-translate-y-1"
                  >
                    Lihat Event Kemang
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
