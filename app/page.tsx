/**
 * Home Page
 * Single Responsibility: Render homepage content
 * SEO: Optimized for main keywords - jakarta party, jakarta nightlife
 */
import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { QuickAbout } from '@/components/sections/QuickAbout';
import { HostingCTA } from '@/components/sections/HostingCTA';
import { LocationsPreview } from '@/components/sections/LocationsPreview';
import { FeaturedPartners } from '@/components/sections/FeaturedPartners';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata: Metadata = genMeta({
  title: 'Jakarta Party Squad - Komunitas Nightlife & Party #1 Jakarta | Event Gratis',
  description:
    'Komunitas nightlife terbesar di Jakarta! Nikmati party gratis, nightclub exclusive, festival musik. Join 1,000+ members. Event weekend di SCBD, Kemang, PIK. Hosting party gratis tersedia. 18+',
  keywords:
    'komunitas party Jakarta, nightlife Jakarta, party Jakarta, nightclub Jakarta, event party Jakarta, hosting party gratis Jakarta, party gratis Jakarta, cari teman party Jakarta, komunitas nightlife Jakarta, event nightclub Jakarta, festival musik Jakarta, party organizer Jakarta, KOL party Jakarta, clubbing Jakarta, best nightlife Jakarta, party SCBD, party Kemang, party PIK',
  canonical: '/',
});

export default function HomePage() {
  return (
    <>
      <PageViewTracker pageType="home" pageName="Home" pageCategory="main" />
      <Hero />
      <QuickAbout />
      <HostingCTA />
      <LocationsPreview />
      <FeaturedPartners />
    </>
  );
}
