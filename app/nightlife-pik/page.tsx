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
import { Instagram, PartyPopper, ArrowRight, Star, Car, Waves, Users2 } from 'lucide-react';

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
                  Nightclub PIK Jakarta
                </Heading>
                <Text size="xl" className="text-text-secondary text-center w-full">
                  Best Party Venue & Entertainment Pantai Indah Kapuk 2026
                </Text>
                <Text size="base" className="text-text-tertiary text-center max-w-2xl">
                  PIK (Pantai Indah Kapuk) adalah destinasi <strong className="text-secondary">nightlife Jakarta Utara</strong> dengan 
                  venue entertainment modern dan crowd diverse. Nikmati <strong className="text-accent">party PIK</strong> 
                  dengan suasana lebih relax dan parking lebih luas.
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
                  Top Nightclub PIK Jakarta
                </Heading>
                <Text size="base" className="text-text-secondary text-center w-full">
                  Partner nightclub Jakarta Party Squad di area PIK
                </Text>
              </div>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {topClubsPIK.map((club, index) => (
                <div
                  key={index}
                  className="glass-strong rounded-xl border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-card-hover transition-all duration-500 overflow-hidden hover:-translate-y-1 group"
                >
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* Image */}
                    <div className="relative h-48 md:h-full rounded-lg overflow-hidden border border-secondary/10 group-hover:border-secondary/30 transition-all">
                      <Image
                        src={club.image}
                        alt={`${club.name} - nightclub PIK Jakarta`}
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
                            PIK, Jakarta Utara
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

        {/* Why PIK */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary" />
          
          <Container className="relative z-10">
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center mb-12">
                <Heading level={2} align="center" className="w-full mb-0 gradient-text">
                  Kenapa Party di PIK?
                </Heading>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 glass rounded-xl border border-secondary/20 hover:border-secondary/30 transition-all duration-500 text-center hover:-translate-y-1">
                  <div className="mb-4 flex justify-center">
                    <Car className="w-10 h-10 text-secondary" />
                  </div>
                  <Heading level={3} className="text-lg mb-2 text-secondary">
                    Easy Parking
                  </Heading>
                  <Text size="sm" className="text-text-tertiary">
                    Parkir luas dan mudah. Gak perlu pusing cari parkir seperti di SCBD.
                  </Text>
                </div>

                <div className="p-6 glass rounded-xl border border-accent/20 hover:border-accent/30 transition-all duration-500 text-center hover:-translate-y-1">
                  <div className="mb-4 flex justify-center">
                    <Waves className="w-10 h-10 text-accent" />
                  </div>
                  <Heading level={3} className="text-lg mb-2 text-accent">
                    Beach Vibes
                  </Heading>
                  <Text size="sm" className="text-text-tertiary">
                    Dekat pantai, suasana lebih fresh. Perfect untuk pre-party dinner.
                  </Text>
                </div>

                <div className="p-6 glass rounded-xl border border-secondary/20 hover:border-secondary/30 transition-all duration-500 text-center hover:-translate-y-1">
                  <div className="mb-4 flex justify-center">
                    <Users2 className="w-10 h-10 text-secondary" />
                  </div>
                  <Heading level={3} className="text-lg mb-2 text-secondary">
                    Less Crowded
                  </Heading>
                  <Text size="sm" className="text-text-tertiary">
                    Lebih spacious, gak se-packed SCBD. Enjoy party dengan lebih comfortable.
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
                  Party Gratis di PIK Jakarta!
                </Heading>
                <Text size="base" className="text-text-secondary text-center max-w-2xl">
                  Ikut hosting crowd dan nikmati party gratis di nightclub PIK setiap weekend.
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
                    Lihat Event PIK
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
