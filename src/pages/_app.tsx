import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/main.css';
import SEO from '../seo.config';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <DefaultSeo {...SEO} />
    <SocialProfileJsonLd
      type="Organization"
      name="Jakarta Party Squad"
      url="https://jakartapartysquad.com"
      sameAs={[
        'https://www.instagram.com/jakartapartysquad',
        'https://www.tiktok.com/@jakarta_party_squad',
      ]}
    />
    <LogoJsonLd
      logo="https://jakartapartysquad.com/assets/images/logo_2.png"
      url="https://jakartapartysquad.com"
    />
    <Head>
      <title>Jakarta Party Squad - Community • Media • Event Partner</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
