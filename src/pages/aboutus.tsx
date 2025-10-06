import React from 'react';

import { NextSeo, BreadcrumbJsonLd } from 'next-seo';

import AboutUs from '../components/AboutUs';

const AboutUsPage = () => (
  <>
    <NextSeo
      title="About Us – Jakarta Party Squad"
      description="Tentang Jakarta Party Squad: komunitas clubbing, media, dan event partner di Jakarta."
      canonical="https://jakartapartysquad.com/aboutus"
      openGraph={{ url: 'https://jakartapartysquad.com/aboutus' }}
    />
    <BreadcrumbJsonLd
      itemListElements={[
        { position: 1, name: 'Home', item: 'https://jakartapartysquad.com/' },
        {
          position: 2,
          name: 'About Us',
          item: 'https://jakartapartysquad.com/aboutus',
        },
      ]}
    />
    <AboutUs />
  </>
);

export default AboutUsPage;
