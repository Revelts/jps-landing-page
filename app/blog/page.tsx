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
        <section className="bg-gradient-to-b from-indigo-50 to-white py-16 sm:py-20">
          <Container>
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={1} align="center" className="w-full mb-0">
                  Blog Nightlife Jakarta
                </Heading>
                <Text size="xl" className="text-gray-600 text-center w-full">
                  Tips, Review, Guide Party & Nightclub Terbaik Jakarta
                </Text>
                <Text size="base" className="text-gray-700 text-center max-w-2xl">
                  Panduan lengkap untuk menikmati nightlife Jakarta! Dari review nightclub terbaik, 
                  tips party aman, hingga event guide terkini. Update setiap minggu.
                </Text>
              </div>
            </div>
          </Container>
        </section>

        {/* Coming Soon */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 sm:p-12 border border-indigo-100">
                <div className="flex flex-col items-center">
                  {/* Icon & Title & Description Group */}
                  <div className="flex flex-col items-center space-y-4 mb-8">
                    <span className="text-6xl">📝</span>
                    <Heading level={2} align="center" className="w-full mb-0">
                      Blog Coming Soon!
                    </Heading>
                    <Text size="lg" className="text-gray-600 text-center max-w-2xl">
                      Kami sedang menyiapkan konten-konten berkualitas untuk kamu.
                      Artikel pertama akan segera hadir!
                    </Text>
                  </div>
                  
                  {/* Planned Articles Preview */}
                  <div className="w-full max-w-2xl p-6 bg-white rounded-xl border border-gray-200 mb-8">
                    <Text size="base" className="font-semibold text-black mb-4 text-center">
                      Artikel yang Akan Datang:
                    </Text>
                    <ul className="text-left space-y-2 text-gray-700">
                      <li>📍 15 Best Nightclub Jakarta 2026 - Review Lengkap</li>
                      <li>🎊 7 Cara Ikut Party Gratis Jakarta (Legal & Tested!)</li>
                      <li>👥 Tips Cari Teman Party yang Aman di Jakarta</li>
                      <li>🎉 Event Nightlife Jakarta Minggu Ini (Update Weekly)</li>
                      <li>🎧 Best DJ Jakarta 2026 - Top 10 Local & International</li>
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/hosting/gratis"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl transition"
                  >
                    Sementara, Cek Hosting Gratis! 🎊
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <Container>
            <div className="w-full max-w-2xl mx-auto px-4">
              <div className="flex flex-col items-center space-y-6">
                <Heading level={3} align="center" className="w-full mb-0">
                  Get Notified Saat Artikel Pertama Publish!
                </Heading>
                <Text size="base" className="text-gray-600 text-center w-full">
                  Follow Instagram kami untuk update artikel terbaru tentang nightlife Jakarta.
                </Text>
                <a
                  href="https://instagram.com/jakartapartysquad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:shadow-lg transition"
                >
                  <span>📱</span>
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
