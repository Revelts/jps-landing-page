import React from 'react';

import type { GetServerSideProps } from 'next';
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';

import Partners from '../components/Partners';

const PartnersPage = () => (
  <>
    <NextSeo
      title="Partners – Jakarta Party Squad"
      description="Partner dan kolaborasi Jakarta Party Squad dengan venue dan brand nightlife."
      canonical="https://jakartapartysquad.com/partners"
      openGraph={{ url: 'https://jakartapartysquad.com/partners' }}
    />
    <BreadcrumbJsonLd
      itemListElements={[
        { position: 1, name: 'Home', item: 'https://jakartapartysquad.com/' },
        {
          position: 2,
          name: 'Partners',
          item: 'https://jakartapartysquad.com/partners',
        },
      ]}
    />
    <Partners />
  </>
);

export default PartnersPage;

export const getServerSideProps: GetServerSideProps = async () => {
  // If later you want dynamic partners from an API, fetch here
  return { props: {} };
};
