// SEO Metadata generator following DRY and SRP principles
import { Metadata } from 'next';
import { MetadataConfig } from '@/types';
import { siteUrl, siteName } from './config';

/**
 * Generate metadata for pages
 * Single Responsibility: Only handles metadata generation
 * Includes full OpenGraph support for all social media (Facebook, Instagram, Twitter, WhatsApp, LinkedIn, etc.)
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
    // OpenGraph for Facebook, WhatsApp, LinkedIn, and other platforms
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
          type: 'image/jpeg',
        },
        {
          url: `${siteUrl}/assets/images/logo_2_512.png`,
          width: 512,
          height: 512,
          alt: `${siteName} Logo`,
          type: 'image/png',
        },
      ],
      locale: 'id_ID',
      type: 'website',
      // Additional OG tags for better social media support
      countryName: 'Indonesia',
    },
    // Twitter Card (X)
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@jakartapartysquad',
      site: '@jakartapartysquad',
    },
    // Additional meta tags for other platforms
    other: {
      // WhatsApp uses og: tags but these help with rich previews
      'og:image:width': '1200',
      'og:image:height': '630',
      // Telegram
      'telegram:channel': '@jakartapartysquad',
      // Pinterest
      'pinterest:description': description,
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
      '@id': `${siteUrl}/#logo`,
      url: `${siteUrl}/assets/images/logo_2_512.png`,
      contentUrl: `${siteUrl}/assets/images/logo_2_512.png`,
      width: 512,
      height: 512,
      caption: 'Jakarta Party Squad Logo',
    },
    image: [
      `${siteUrl}/assets/images/logo_2_512.png`,
      `${siteUrl}/assets/images/header.jpg`,
    ],
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

/**
 * Generate Article Schema for blog posts
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteUrl}/blog/${article.slug}#article`,
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author || 'Jakarta Party Squad',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/assets/images/logo_2_512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${article.slug}`,
    },
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
  };
}

/**
 * Generate Blog-specific metadata with full social media support
 */
export function generateBlogMetadata(config: {
  title: string;
  description: string;
  image?: string;
  slug?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  category?: string;
}): Metadata {
  const {
    title,
    description,
    image = `${siteUrl}/assets/images/header.jpg`,
    slug,
    publishedTime,
    modifiedTime,
    author,
    tags,
    category,
  } = config;

  const fullTitle = `${title} | Jakarta Party Squad`;
  const pageUrl = slug ? `${siteUrl}/blog/${slug}` : `${siteUrl}/blog`;
  const isArticle = !!slug;

  return {
    title,
    description,
    keywords: tags?.join(', ') || 'jakarta party, nightlife jakarta, club jakarta',
    authors: author ? [{ name: author }] : [{ name: siteName }],
    creator: author || siteName,
    publisher: siteName,
    
    // OpenGraph for Facebook, WhatsApp, LinkedIn, Instagram, and other platforms
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
      ],
      locale: 'id_ID',
      type: isArticle ? 'article' : 'website',
      ...(isArticle && publishedTime && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: author ? [author] : ['Jakarta Party Squad'],
        section: category || 'Nightlife',
        tags: tags || ['Jakarta', 'Party', 'Nightlife'],
      }),
      countryName: 'Indonesia',
    },
    
    // Twitter Card (X)
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@jakartapartysquad',
      site: '@jakartapartysquad',
    },
    
    // Additional meta tags for WhatsApp and other platforms
    other: {
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': title,
      ...(isArticle && publishedTime && {
        'article:published_time': publishedTime,
        'article:modified_time': modifiedTime || publishedTime,
        'article:author': author || 'Jakarta Party Squad',
        'article:section': category || 'Nightlife',
        ...(tags && tags.length > 0 && {
          'article:tag': tags.join(', '),
        }),
      }),
    },
    
    alternates: {
      canonical: pageUrl,
    },
  };
}
