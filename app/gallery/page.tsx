/**
 * Gallery Page
 * Single Responsibility: Display event photos and albums
 * SEO: Optimized for "gallery" and "event photos" keywords
 */
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = genMeta({
  title: 'Gallery - Jakarta Party & Nightlife Event Photos',
  description:
    'Lihat foto-foto event nightclub terbaik di Jakarta! Gallery dokumentasi party, festival musik elektronik, dan momen seru di nightlife Jakarta. Jelajahi album event dari venue top: Wildout, Blackowl, Fyne, dan lainnya.',
  keywords:
    'jakarta party photos, jakarta nightlife photos, jakarta club photos, jakarta event gallery, party jakarta pictures, nightclub jakarta photos, jakarta nightlife gallery, jakarta party moments, jakarta edm photos, jakarta festival photos, clubbing jakarta photos',
  canonical: '/gallery',
});

export default function GalleryPage() {
  const { albums, gallery } = siteConfig;

  return (
    <>
      {/* Page Hero */}
      <Section className="relative overflow-hidden pt-24 sm:pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-accent/10 animate-gradient-shift bg-[length:200%_200%]" />
        </div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        
        <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <Heading level={1} align="center" className="gradient-text tracking-wide">
            {gallery.title}
          </Heading>
          <Text size="lg" color="secondary" align="center" className="text-text-secondary">
            {albums.description}
          </Text>
        </div>
      </Section>

      {/* Albums Grid */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary" />
        
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {albums.items.map((album, index) => (
            <Card key={index} hoverable padding="none" variant="elevated" className="overflow-hidden group">
              <Link
                href={album.url === '#' ? '/gallery' : album.url}
                className="block"
              >
                <div className="space-y-0">
                  {/* Album Photo */}
                  <div className="relative aspect-[4/3] bg-surface overflow-hidden">
                    <Image
                      src={album.photo}
                      alt={album.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Album Info */}
                  <div className="p-4 sm:p-6 bg-surface/50 backdrop-blur-sm">
                    <h3 className="font-semibold text-text-primary text-lg sm:text-xl mb-2 group-hover:text-secondary transition-colors">
                      {album.name}
                    </h3>
                    {album.date && (
                      <p className="text-sm text-text-tertiary">{album.date}</p>
                    )}
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Gallery Images Grid - Using existing images */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
        
        <div className="relative z-10 space-y-8 sm:space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} align="center" className="gradient-text">
              Event Highlights
            </Heading>
            <Text size="base" color="secondary" align="center" className="text-text-secondary">
              Capturing unforgettable moments from our events
            </Text>
          </div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className="relative aspect-square rounded-xl overflow-hidden shadow-glass hover:shadow-card-hover transition-all duration-500 cursor-pointer group border-2 border-secondary/10 hover:border-secondary/30"
              >
                <Image
                  src={`/assets/images/${num}.jpg`}
                  alt={`Event moment ${num}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 to-bg-primary" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <Card variant="elevated" className="text-center">
            <div className="space-y-6">
              <Heading level={2} align="center" className="gradient-text">
                Want to Be Featured?
              </Heading>
              <Text size="lg" color="secondary" align="center" className="text-text-secondary">
                Join our events and be part of the next photo album! Follow us on Instagram and TikTok for more updates.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://www.instagram.com/jakartapartysquad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary to-accent text-bg-primary font-semibold rounded-lg hover:shadow-glow transition-all duration-400 min-h-[44px] hover:-translate-y-0.5">
                    Follow on Instagram
                  </button>
                </Link>
                <Link
                  href="https://schedule.jakartapartysquad.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="inline-flex items-center px-6 py-3 border-2 border-secondary text-secondary font-medium rounded-lg hover:bg-secondary/10 transition-all duration-400 min-h-[44px] hover:-translate-y-0.5">
                    View Event Schedule
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
