/**
 * Blog Main Page
 * SEO: Blog hub for nightlife Jakarta content
 */
import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import Link from 'next/link';
import { FileText, MapPin, PartyPopper, Users, Music, Headphones, Instagram } from 'lucide-react';

export const metadata: Metadata = genMeta({
  title: 'Blog Nightlife Jakarta - Tips, Review, Guide Party & Club | JPS',
  description: 'Panduan lengkap nightlife Jakarta! Review nightclub terbaik, tips party aman, event guide, daftar club Jakarta. Update artikel setiap minggu.',
  keywords: 'blog nightlife Jakarta, review nightclub Jakarta, tips party Jakarta, panduan clubbing Jakarta, club reviews Jakarta, guide party Jakarta, artikel nightlife Jakarta',
  canonical: '/blog',
});

export default function BlogPage() {
  return (
    <>
      <PageViewTracker pageType="other" pageName="Blog" pageCategory="content" />
      
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
                  Blog Nightlife Jakarta
                </Heading>
                <Text size="xl" className="text-text-secondary text-center w-full">
                  Tips, Review, Guide Party & Nightclub Terbaik Jakarta
                </Text>
                <Text size="base" className="text-text-tertiary text-center max-w-2xl">
                  Panduan lengkap untuk menikmati nightlife Jakarta! Dari review nightclub terbaik, 
                  tips party aman, hingga event guide terkini. Update setiap minggu.
                </Text>
              </div>
            </div>
          </Container>
        </section>

        {/* Coming Soon */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary" />
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="glass-strong rounded-2xl p-8 sm:p-12 border-2 border-secondary/20">
                <div className="flex flex-col items-center">
                  {/* Icon & Title & Description Group */}
                  <div className="flex flex-col items-center space-y-4 mb-8">
                    <div>
                      <FileText className="w-16 h-16 text-secondary" />
                    </div>
                    <Heading level={2} align="center" className="w-full mb-0 gradient-text">
                      Blog Coming Soon!
                    </Heading>
                    <Text size="lg" className="text-text-secondary text-center max-w-2xl">
                      Kami sedang menyiapkan konten-konten berkualitas untuk kamu.
                      Artikel pertama akan segera hadir!
                    </Text>
                  </div>
                  
                  {/* Planned Articles Preview */}
                  <div className="w-full max-w-2xl p-6 glass rounded-xl border border-secondary/20 mb-8">
                    <Text size="base" className="font-semibold text-text-primary mb-4 text-center tracking-wide">
                      Artikel yang Akan Datang:
                    </Text>
                    <ul className="text-left space-y-2 text-text-tertiary">
                      <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" /> 15 Best Nightclub Jakarta 2026 - Review Lengkap</li>
                      <li className="flex items-start gap-2"><PartyPopper className="w-4 h-4 text-accent mt-1 flex-shrink-0" /> 7 Cara Ikut Party Gratis Jakarta (Legal & Tested!)</li>
                      <li className="flex items-start gap-2"><Users className="w-4 h-4 text-secondary mt-1 flex-shrink-0" /> Tips Cari Teman Party yang Aman di Jakarta</li>
                      <li className="flex items-start gap-2"><Music className="w-4 h-4 text-accent mt-1 flex-shrink-0" /> Event Nightlife Jakarta Minggu Ini (Update Weekly)</li>
                      <li className="flex items-start gap-2"><Headphones className="w-4 h-4 text-secondary mt-1 flex-shrink-0" /> Best DJ Jakarta 2026 - Top 10 Local & International</li>
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/hosting/gratis"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary to-accent text-bg-primary font-bold rounded-full hover:shadow-glow-lg transition-all duration-400 hover:-translate-y-1"
                  >
                    <PartyPopper className="w-5 h-5" />
                    Sementara, Cek Hosting Gratis!
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
          
          <Container className="relative z-10">
            <div className="w-full max-w-2xl mx-auto px-4">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={3} align="center" className="w-full mb-0 gradient-text">
                  Get Notified Saat Artikel Pertama Publish!
                </Heading>
                <Text size="base" className="text-text-secondary text-center w-full">
                  Follow Instagram kami untuk update artikel terbaru tentang nightlife Jakarta.
                </Text>
                <a
                  href="https://instagram.com/jakartapartysquad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-bg-primary font-semibold rounded-full hover:shadow-glow-purple transition-all duration-400 hover:-translate-y-1"
                >
                  <Instagram className="w-5 h-5" />
                  Follow @jakartapartysquad
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
