/**
 * Home Page
 * Single Responsibility: Render homepage content
 * SEO: Optimized for main keywords - jakarta party, jakarta nightlife
 */
import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { QuickAbout } from '@/components/sections/QuickAbout';
import { FeaturedPartners } from '@/components/sections/FeaturedPartners';
import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata: Metadata = genMeta({
  title: 'Jakarta Party Squad - Best Nightlife & Party Community in Jakarta',
  description:
    'Komunitas nightlife #1 di Jakarta! Temukan event nightclub terbaik, party eksklusif, dan festival musik elektronik. Join 10,000+ members untuk pengalaman nightlife terbaik di Jakarta. Event setiap weekend!',
  keywords:
    'jakarta party, jakarta nightlife, nightclub jakarta, best club jakarta, jakarta party scene, party jakarta 2024, clubbing jakarta, jakarta night out, jakarta electronic music, jakarta edm events, jakarta weekend party, jakarta club events, jakarta party community, jakarta nightlife guide, best nightlife jakarta, jakarta party calendar, jakarta clubbing scene, jakarta entertainment, jakarta bar scene, top clubs jakarta',
  canonical: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickAbout />
      <FeaturedPartners />
    </>
  );
}
