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

export const metadata: Metadata = genMeta({
  title: 'Blacklist Users - Daftar Pengguna Bermasalah Jakarta Party',
  description:
    'Database blacklist pengguna bermasalah untuk keamanan komunitas Jakarta Party Squad. Cari nomor penipu, Instagram penipu, dan pengguna bermasalah lainnya. Lindungi diri Anda dari fraud dan scam di nightlife Jakarta.',
  keywords:
    'blacklist user, nomor penipu, instagram penipu, daftar pengguna bermasalah, scam jakarta, fraud jakarta, blacklist nightclub, jakarta party blacklist, pengguna bermasalah jakarta, database penipu, cek nomor penipu, cek instagram penipu',
  canonical: '/blacklist',
});

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
      <Section className="bg-gradient-to-br from-red-50 via-white to-gray-50 pt-24 sm:pt-28 md:pt-32">
        <div className="text-center space-y-5 sm:space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
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
          <Heading level={1} align="center" className="!leading-tight">
            Blacklist Users
          </Heading>

          {/* Description */}
          <Text size="lg" color="secondary" align="center" className="leading-relaxed">
            Database pengguna bermasalah untuk melindungi keamanan dan kenyamanan komunitas
            Jakarta Party Squad. Cari berdasarkan nomor HP atau Instagram username.
          </Text>
        </div>
      </Section>

      {/* Stats Section */}
      <Section className="bg-white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          <Card className="text-center bg-gradient-to-br from-red-50 to-white border-red-100">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-red-600">
                {stats.total}
              </div>
              <Text size="sm" color="secondary">
                Total Blacklisted
              </Text>
            </div>
          </Card>
          <Card className="text-center bg-gradient-to-br from-blue-50 to-white border-blue-100">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                {stats.withPhone}
              </div>
              <Text size="sm" color="secondary">
                With Phone
              </Text>
            </div>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-50 to-white border-purple-100">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600">
                {stats.withInstagram}
              </div>
              <Text size="sm" color="secondary">
                With Instagram
              </Text>
            </div>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-50 to-white border-green-100">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-green-600">
                {stats.withBoth}
              </div>
              <Text size="sm" color="secondary">
                Complete Data
              </Text>
            </div>
          </Card>
        </div>
      </Section>

      {/* Search & Table Section */}
      <Section>
        <div className="max-w-7xl mx-auto">
          {/* Info Banner */}
          <Card className="mb-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-yellow-600"
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
                <Text size="sm" className="font-semibold text-yellow-800">
                  Perhatian
                </Text>
                <Text size="sm" color="secondary" className="text-yellow-700">
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
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="space-y-6">
              <Heading level={2} className="text-xl sm:text-2xl">
                Tentang Blacklist
              </Heading>

              <div className="space-y-4">
                <div>
                  <Heading level={3} className="text-base sm:text-lg mb-2">
                    Apa itu Blacklist?
                  </Heading>
                  <Text size="base" color="secondary" className="leading-relaxed">
                    Blacklist adalah database pengguna yang terbukti melakukan pelanggaran serius
                    seperti fraud, kekerasan, atau perilaku yang merugikan komunitas. Data ini
                    digunakan untuk melindungi anggota komunitas dari potensi kerugian.
                  </Text>
                </div>

                <div>
                  <Heading level={3} className="text-base sm:text-lg mb-2">
                    Alasan Blacklist
                  </Heading>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
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
                  <Heading level={3} className="text-base sm:text-lg mb-2">
                    Cara Menggunakan
                  </Heading>
                  <Text size="base" color="secondary" className="leading-relaxed">
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
