import React from 'react';

import { NextSeo, BreadcrumbJsonLd } from 'next-seo';

import Albums from '../components/Albums';

const AlbumsPage = () => (
  <>
    <NextSeo
      title="Photo Album Collection – Jakarta Party Squad"
      description="Koleksi album foto event dan venue komunitas clubbing Jakarta Party Squad."
      canonical="https://jakartapartysquad.com/albums"
      openGraph={{ url: 'https://jakartapartysquad.com/albums' }}
    />
    <BreadcrumbJsonLd
      itemListElements={[
        { position: 1, name: 'Home', item: 'https://jakartapartysquad.com/' },
        {
          position: 2,
          name: 'Albums',
          item: 'https://jakartapartysquad.com/albums',
        },
      ]}
    />
    <Albums />
  </>
);

export default AlbumsPage;
