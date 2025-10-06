import { DefaultSeoProps } from 'next-seo';

const siteUrl = 'https://jakartapartysquad.com';
const siteName = 'Jakarta Party Squad';
const defaultTitle = 'Jakarta Party Squad - Community • Media • Event Partner';
const description =
  'Komunitas clubbing/dugem dan media dunia malam di Jakarta. Partner event untuk klub malam, festival, dan brand. Bergabunglah dengan komunitas nightlife Jakarta: party, kolaborasi, dan momen tak terlupakan.';

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
    locale: 'id_ID',
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
  languageAlternates: [
    {
      hrefLang: 'id-ID',
      href: siteUrl,
    },
  ],
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'clubbing, nightlife, nightclub, event partner, event media, community, clubbing community, party jakarta, jakarta nightlife, event jakarta, club jakarta, dunia malam, klub malam, dugem, komunitas clubbing, komunitas nightlife, festival musik, event malam jakarta, komunitas clubbing jakarta, komunitas nightlife jakarta, komunitas dugem jakarta, bar malam jakarta, event club malam jakarta, event nightlife jakarta, event partner jakarta, event media jakarta, party jakarta tonight, best nightclub jakarta, jakarta party community, jakarta nightlife guide, jakarta clubbing scene, daftar club malam jakarta, harga table club jakarta, vip table jakarta, bottle service jakarta, ladies night jakarta, afterparty jakarta, rooftop bar jakarta, live music jakarta, dj jakarta, edm jakarta, techno jakarta, hip hop club jakarta, rnb club jakarta, house music jakarta, festival musik jakarta, rave jakarta, dance event jakarta, kolaborasi brand nightlife, promosi event club jakarta, fotografer nightlife jakarta, videografer nightlife jakarta, media partner event jakarta, press release event malam, tiket event malam jakarta, guest list club jakarta, open table club jakarta, student night jakarta, corporate party jakarta, private party jakarta, birthday party club jakarta, halloween party jakarta, new year party jakarta, valentine party jakarta, happy hour jakarta, bar crawl jakarta, club crawl jakarta, scbd nightlife, senopati nightlife, kemang nightlife, pantai indah kapuk nightlife, jakarta night event calendar, rekomendasi club jakarta, club terdekat jakarta, dress code club jakarta, aturan masuk club jakarta, keamanan club jakarta, tips first time clubbing, etika di club malam, komunitas party indonesia, nightlife influencer jakarta, party host jakarta, event organizer nightlife, sponsorship nightlife jakarta, brand activation club, komunitas pecinta musik dance, kumpulan foto event club, album foto nightlife jakarta, galeri event komunitas, komunitas bar & club jakarta, networking nightlife jakarta, cari teman party jakarta, collab komunitas nightlife',
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
