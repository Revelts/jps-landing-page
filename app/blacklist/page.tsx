/**
 * Blacklist Page
 * Single Responsibility: Display blacklisted users with search functionality
 * SEO: Optimized for "blacklist", "nomor penipu", "instagram penipu"
 * Architecture: Server Component for data loading, Client Components for interactivity
 */

import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { generateMetadata as genMeta, generateBreadcrumbSchema } from '@/lib/metadata';
import { getAllBlacklistUsers, getBlacklistStats } from './services/blacklist.service';
import { BlacklistSearch } from './components/BlacklistSearch';

export const metadata: Metadata = {
  ...genMeta({
    title: 'Blacklist Users - Daftar Pengguna Bermasalah Jakarta Party',
    description:
      'Database blacklist pengguna bermasalah untuk keamanan komunitas Jakarta Party Squad. Cari nomor penipu, Instagram penipu, dan pengguna bermasalah lainnya. Lindungi diri Anda dari fraud dan scam di nightlife Jakarta.',
    keywords:
      'blacklist user, nomor penipu, instagram penipu, daftar pengguna bermasalah, scam jakarta, fraud jakarta, blacklist nightclub, jakarta party blacklist, pengguna bermasalah jakarta, database penipu, cek nomor penipu, cek instagram penipu',
    canonical: '/blacklist',
  }),
  // Restricted page - no index by search engines
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default async function BlacklistPage() {
  // Load data on server (serverless-compatible)
  const users = await getAllBlacklistUsers();
  const stats = await getBlacklistStats();

  // Generate breadcrumb schema for SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blacklist', url: '/blacklist' },
  ]);

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Page Hero */}
      <Section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
          <div className="absolute inset-0 bg-gradient-to-tr from-red-900/10 via-transparent to-secondary/10 animate-gradient-shift bg-[length:200%_200%]" />
        </div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        
        <div className="relative z-10 text-center space-y-5 sm:space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-red-500/20 text-red-300 rounded-full text-sm font-medium border border-red-500/30 backdrop-blur-sm">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clipRule="evenodd"
              />
            </svg>
            Security Database
          </div>

          {/* Heading */}
          <Heading level={1} align="center" className="!leading-tight text-text-primary tracking-wide">
            Blacklist Users
          </Heading>

          {/* Description */}
          <Text size="lg" color="secondary" align="center" className="leading-relaxed text-text-secondary">
            Database pengguna bermasalah untuk melindungi keamanan dan kenyamanan komunitas
            Jakarta Party Squad. Cari berdasarkan nomor HP atau Instagram username.
          </Text>
        </div>
      </Section>

      {/* Stats Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary" />
        
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          <Card className="text-center glass border-2 border-red-500/20 hover:border-red-500/40 hover:shadow-glow-purple-sm transition-all duration-500 hover:-translate-y-1">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">
                {stats.total}
              </div>
              <Text size="sm" color="secondary" className="text-text-tertiary">
                Total Blacklisted
              </Text>
            </div>
          </Card>
          <Card className="text-center glass border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-500 hover:-translate-y-1">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">
                {stats.withPhone}
              </div>
              <Text size="sm" color="secondary" className="text-text-tertiary">
                With Phone
              </Text>
            </div>
          </Card>
          <Card className="text-center glass border-2 border-accent/20 hover:border-accent/40 hover:shadow-glow-purple-sm transition-all duration-500 hover:-translate-y-1">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">
                {stats.withInstagram}
              </div>
              <Text size="sm" color="secondary" className="text-text-tertiary">
                With Instagram
              </Text>
            </div>
          </Card>
          <Card className="text-center glass border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-glow-sm transition-all duration-500 hover:-translate-y-1">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">
                {stats.withBoth}
              </div>
              <Text size="sm" color="secondary" className="text-text-tertiary">
                Complete Data
              </Text>
            </div>
          </Card>
        </div>
      </Section>

      {/* Search & Table Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary to-bg-secondary" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Info Banner */}
          <Card className="mb-6 bg-yellow-900/20 border-2 border-yellow-500/30 backdrop-blur-md">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1 space-y-1">
                <Text size="sm" className="font-semibold text-yellow-300">
                  Perhatian
                </Text>
                <Text size="sm" color="secondary" className="text-yellow-200/80">
                  Data ini bersifat rahasia dan hanya untuk keperluan verifikasi internal komunitas.
                  Gunakan dengan bijak dan jangan disebarluaskan ke publik.
                </Text>
              </div>
            </div>
          </Card>

          {/* Search Component (Client Component with all data) */}
          <BlacklistSearch initialUsers={users} />
        </div>
      </Section>

      {/* Info Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 to-bg-primary" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <Card variant="elevated">
            <div className="space-y-6">
              <Heading level={2} className="text-xl sm:text-2xl gradient-text">
                Tentang Blacklist
              </Heading>

              <div className="space-y-4">
                <div>
                  <Heading level={3} className="text-base sm:text-lg mb-2 text-secondary">
                    Apa itu Blacklist?
                  </Heading>
                  <Text size="base" color="secondary" className="leading-relaxed text-text-secondary">
                    Blacklist adalah database pengguna yang terbukti melakukan pelanggaran serius
                    seperti fraud, kekerasan, atau perilaku yang merugikan komunitas. Data ini
                    digunakan untuk melindungi anggota komunitas dari potensi kerugian.
                  </Text>
                </div>

                <div>
                  <Heading level={3} className="text-base sm:text-lg mb-2 text-accent">
                    Alasan Blacklist
                  </Heading>
                  <ul className="list-disc list-inside space-y-2 text-text-tertiary">
                    <li>Hosting Telat</li>
                    <li>Attitude tidak sopan di club</li>
                    <li>Tidak ada kabar dan tidak bisa dihubungi setelah daftar hosting</li>
                    <li>Cancel hosting dadakan</li>
                    <li>Fraud atau penipuan</li>
                    <li>Kekerasan atau ancaman terhadap guest/staff</li>
                    <li>Perusakan properti venue</li>
                    <li>Harassment atau perilaku tidak pantas</li>
                  </ul>
                </div>

                <div>
                  <Heading level={3} className="text-base sm:text-lg mb-2 text-secondary">
                    Cara Menggunakan
                  </Heading>
                  <Text size="base" color="secondary" className="leading-relaxed text-text-secondary">
                    Gunakan kolom pencarian untuk mencari berdasarkan nomor HP atau Instagram
                    username. Anda dapat memfilter berdasarkan jenis data (phone, Instagram, atau
                    semua). Pastikan untuk memverifikasi informasi sebelum mengambil keputusan.
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
