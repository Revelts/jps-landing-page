/**
 * Root Layout
 * Single Responsibility: Provide app-wide layout structure
 * Includes: HTML structure, global styles, header, footer
 */
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GoogleTagManager } from '@/components/analytics/GoogleTagManager';
import { ClickTracker } from '@/components/analytics/ClickTracker';
import { 
  generateMetadata as genMeta, 
  generateOrganizationSchema, 
  generateWebSiteSchema,
  generateLocalBusinessSchema,
  generateSiteNavigationSchema
} from '@/lib/metadata';
import '@/src/styles/main.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#6366f1',
};

export const metadata: Metadata = {
  ...genMeta({
    title: 'Jakarta Party Squad - Komunitas Nightlife & Clubbing Jakarta',
    description:
      'Komunitas nightlife terbesar di Jakarta. Event partner untuk nightclub, festival musik, dan party entertainment. Bergabung dengan 1,000+ party enthusiasts di Jakarta. Temukan event malam terbaik di Jakarta!',
    keywords:
      'jakarta party, jakarta nightlife, nightclub jakarta, club jakarta, party jakarta, jakarta clubbing, dugem jakarta, jakarta night club, event jakarta, festival jakarta, jakarta nightlife community, jakarta party community, club malam jakarta, tempat party jakarta, jakarta entertainment, jakarta electronic music, jakarta edm, jakarta bar, jakarta lounge, best nightclub jakarta',
  }),
  // Icons - Jakarta Party Squad Logo
  icons: {
    icon: [
      { url: '/assets/images/logo_2.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/images/logo_2.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/images/logo_2_512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/images/logo_2.png', sizes: '180x180', type: 'image/png' },
      { url: '/assets/images/logo_2_512.png', sizes: '512x512', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/assets/images/logo_2_512.png',
      },
      {
        rel: 'mask-icon',
        url: '/assets/images/logo_2_512.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const siteNavigationSchema = generateSiteNavigationSchema();

  return (
    <html lang="id" className={inter.variable}>
      <head>
        {/* Geo-targeting Meta Tags */}
        <meta name="geo.region" content="ID-JK" />
        <meta name="geo.placename" content="Jakarta" />
        <meta name="geo.position" content="-6.2088;106.8456" />
        <meta name="ICBM" content="-6.2088, 106.8456" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {/* Structured Data - Site Navigation (for Google Sitelinks) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationSchema),
          }}
        />
      </head>
      <body className="antialiased bg-white text-black">
        {/* Google Tag Manager */}
        <GoogleTagManager />
        
        {/* Click Tracker - Auto-track all clicks */}
        <ClickTracker />
        
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
