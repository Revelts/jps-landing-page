import { DefaultSeoProps } from 'next-seo';

const siteUrl = 'https://jakartapartysquad.com';
const siteName = 'Jakarta Party Squad';
const defaultTitle = 'Jakarta Party Squad - Community • Media • Event Partner';
const description =
  'Clubbing community and nightlife media in Jakarta. Event partner for clubs and brands. Join a vibrant community with parties, collaborations, and unforgettable moments.';

const SEO: DefaultSeoProps = {
  title: defaultTitle,
  titleTemplate: '%s | Jakarta Party Squad',
  description,
  canonical: siteUrl,
  openGraph: {
    type: 'website',
    url: siteUrl,
    site_name: siteName,
    title: defaultTitle,
    description,
    images: [
      {
        url: `${siteUrl}/assets/images/header.jpg`,
        width: 1200,
        height: 630,
        alt: 'Jakarta Party Squad',
      },
      {
        url: `${siteUrl}/assets/images/logo_2.png`,
        width: 512,
        height: 512,
        alt: 'JPS Logo',
      },
    ],
  },
  twitter: {
    handle: '@jakartapartysquad',
    site: '@jakartapartysquad',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'clubbing, nightlife, nightclub, event partner, event media, community, clubbing community, party jakarta, jakarta nightlife, event jakarta, club jakarta',
    },
    { name: 'author', content: 'Jakarta Party Squad' },
    { name: 'theme-color', content: '#0b1b3b' },
    {
      name: 'google-site-verification',
      content: 'yubfUVzPbiFtQk0MFN-mly2pMvbX4AIqP5ppXzWvR9o',
    },
  ],
};

export default SEO;
