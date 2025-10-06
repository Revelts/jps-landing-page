import React from 'react';

import { NextSeo, BreadcrumbJsonLd } from 'next-seo';

import Benefits from '../components/Benefits';

const BenefitsPage = () => (
  <>
    <NextSeo
      title="Benefits – Jakarta Party Squad"
      description="Benefit bergabung dengan komunitas clubbing Jakarta Party Squad."
      canonical="https://jakartapartysquad.com/benefits"
      openGraph={{ url: 'https://jakartapartysquad.com/benefits' }}
    />
    <BreadcrumbJsonLd
      itemListElements={[
        { position: 1, name: 'Home', item: 'https://jakartapartysquad.com/' },
        {
          position: 2,
          name: 'Benefits',
          item: 'https://jakartapartysquad.com/benefits',
        },
      ]}
    />
    <Benefits />
  </>
);

export default BenefitsPage;
