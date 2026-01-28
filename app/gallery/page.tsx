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
      <Section className="bg-gradient-to-b from-primary-50 to-white pt-24 sm:pt-28">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <Heading level={1} align="center">
            {gallery.title}
          </Heading>
          <Text size="lg" color="secondary" align="center">
            {albums.description}
          </Text>
        </div>
      </Section>

      {/* Albums Grid */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {albums.items.map((album, index) => (
            <Card key={index} hoverable padding="none" className="overflow-hidden">
              <Link
                href={album.url === '#' ? '/gallery' : album.url}
                className="block"
              >
                <div className="space-y-0">
                  {/* Album Photo */}
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <Image
                      src={album.photo}
                      alt={album.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  
                  {/* Album Info */}
                  <div className="p-4 sm:p-6">
                    <h3 className="font-semibold text-black text-lg sm:text-xl mb-2">
                      {album.name}
                    </h3>
                    {album.date && (
                      <p className="text-sm text-gray-500">{album.date}</p>
                    )}
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Gallery Images Grid - Using existing images */}
      <Section className="bg-gray-50">
        <div className="space-y-8 sm:space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} align="center">
              Event Highlights
            </Heading>
            <Text size="base" color="secondary" align="center">
              Capturing unforgettable moments from our events
            </Text>
          </div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <Image
                  src={`/assets/images/${num}.jpg`}
                  alt={`Event moment ${num}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <Card className="text-center bg-gradient-to-br from-primary-50 to-white">
            <div className="space-y-6">
              <Heading level={2} align="center">
                Want to Be Featured?
              </Heading>
              <Text size="lg" color="secondary" align="center">
                Join our events and be part of the next photo album! Follow us on Instagram and TikTok for more updates.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://www.instagram.com/jakartapartysquad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-600 transition-colors min-h-[44px]">
                    Follow on Instagram
                  </button>
                </Link>
                <Link
                  href="https://schedule.jakartapartysquad.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors min-h-[44px]">
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
