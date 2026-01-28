// SEO Metadata generator following DRY and SRP principles
import { Metadata } from 'next';
import { MetadataConfig } from '@/types';
import { siteUrl, siteName } from './config';

/**
 * Generate metadata for pages
 * Single Responsibility: Only handles metadata generation
 */
export function generateMetadata(config: MetadataConfig): Metadata {
  const {
    title,
    description,
    keywords,
    ogImage = `${siteUrl}/assets/images/header.jpg`,
    canonical,
  } = config;

  const fullTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    keywords: keywords?.split(', '),
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonical || siteUrl,
      languages: {
        'id-ID': siteUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || siteUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@jakartapartysquad',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'yubfUVzPbiFtQk0MFN-mly2pMvbX4AIqP5ppXzWvR9o',
    },
  };
}

/**
 * Generate JSON-LD structured data
 * Single Responsibility: Only handles structured data generation
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    alternateName: 'JPS Jakarta',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/assets/images/logo_2.png`,
      width: 512,
      height: 512,
    },
    image: `${siteUrl}/assets/images/header.jpg`,
    description:
      'Jakarta Party Squad - Komunitas clubbing terbesar di Jakarta. Media dan partner event untuk nightlife, nightclub, festival musik elektronik, dan brand activation di Jakarta.',
    slogan: 'Jakarta\'s Premier Nightlife Community',
    foundingDate: '2020',
    founder: {
      '@type': 'Person',
      name: 'Jakarta Party Squad Team',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressRegion: 'DKI Jakarta',
      addressCountry: 'ID',
    },
    areaServed: {
      '@type': 'City',
      name: 'Jakarta',
    },
    sameAs: [
      'https://www.instagram.com/jakartapartysquad',
      'https://www.tiktok.com/@jakarta_party_squad',
      'https://discord.gg/UshBBJkDS8',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Indonesian', 'English'],
      areaServed: 'ID',
    },
    knowsAbout: [
      'Nightlife Jakarta',
      'Jakarta Nightclub',
      'Electronic Music Events',
      'Party Community',
      'Club Events Jakarta',
      'Jakarta Entertainment',
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: siteName,
    alternateName: 'Jakarta Party Squad - Nightlife Community',
    url: siteUrl,
    description: 'Komunitas nightlife dan clubbing terbesar di Jakarta',
    inLanguage: 'id-ID',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate LocalBusiness Schema for Jakarta targeting
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: siteName,
    image: `${siteUrl}/assets/images/header.jpg`,
    description:
      'Komunitas nightlife dan event organizer terbesar di Jakarta. Spesialisasi dalam event nightclub, festival musik, dan party entertainment.',
    url: siteUrl,
    telephone: '+62-xxx-xxxx-xxxx',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressRegion: 'DKI Jakarta',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.2088,
      longitude: 106.8456,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday', 'Sunday'],
        opens: '21:00',
        closes: '05:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2000',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.instagram.com/jakartapartysquad',
      'https://www.tiktok.com/@jakarta_party_squad',
      'https://discord.gg/UshBBJkDS8',
    ],
  };
}

/**
 * Generate Event Schema for nightlife events
 */
export function generateEventSchema(eventData?: {
  name: string;
  description: string;
  startDate: string;
  location: string;
}) {
  const defaultEvent = {
    name: 'Jakarta Nightlife Events',
    description: 'Regular nightclub and party events across Jakarta',
    startDate: new Date().toISOString(),
    location: 'Various venues in Jakarta',
  };

  const event = eventData || defaultEvent;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jakarta',
        addressRegion: 'DKI Jakarta',
        addressCountry: 'ID',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    performer: {
      '@type': 'Organization',
      name: siteName,
    },
  };
}

/**
 * Generate BreadcrumbList Schema for better navigation understanding
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

/**
 * Generate SiteNavigationElement for Google Sitelinks
 * This helps Google understand your key pages for search results
 */
export function generateSiteNavigationSchema() {
  const mainNavigation = [
    { name: 'Hosting Party Gratis', url: '/hosting/gratis', description: 'Program hosting crowd gratis di nightclub Jakarta' },
    { name: 'Event Party Jakarta', url: '/events', description: 'Jadwal event party dan nightclub Jakarta' },
    { name: 'Komunitas Nightlife', url: '/community', description: 'Join komunitas party terbesar Jakarta' },
    { name: 'Blog Nightlife', url: '/blog', description: 'Tips, review, dan panduan nightlife Jakarta' },
    { name: 'Nightclub SCBD', url: '/nightlife-scbd', description: 'Panduan nightclub di SCBD Jakarta' },
    { name: 'Nightclub Kemang', url: '/nightlife-kemang', description: 'Panduan nightclub di Kemang Jakarta' },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl}/#navigation`,
    name: 'Jakarta Party Squad Main Navigation',
    description: 'Key pages for nightlife and party community in Jakarta',
    itemListElement: mainNavigation.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      '@id': `${siteUrl}${item.url}`,
      position: index + 1,
      name: item.name,
      description: item.description,
      url: `${siteUrl}${item.url}`,
    })),
  };
}

/**
 * Generate CollectionPage schema for listing pages
 */
export function generateCollectionPageSchema(config: {
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteUrl}${config.url}#collection`,
    name: config.name,
    description: config.description,
    url: `${siteUrl}${config.url}`,
    about: {
      '@type': 'Thing',
      name: 'Jakarta Nightlife',
    },
    numberOfItems: config.numberOfItems,
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
  };
}

/**
 * Generate FAQPage schema for rich results in Google Search
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
