import React from 'react';

import { NextSeo, BreadcrumbJsonLd } from 'next-seo';

import Galleries from '../components/Galleries';

const GalleryPage = () => (
  <>
    <NextSeo
      title="Gallery – Jakarta Party Squad"
      description="Galeri foto nightlife dan komunitas clubbing Jakarta Party Squad."
      canonical="https://jakartapartysquad.com/gallery"
      openGraph={{ url: 'https://jakartapartysquad.com/gallery' }}
    />
    <BreadcrumbJsonLd
      itemListElements={[
        { position: 1, name: 'Home', item: 'https://jakartapartysquad.com/' },
        {
          position: 2,
          name: 'Gallery',
          item: 'https://jakartapartysquad.com/gallery',
        },
      ]}
    />
    <Galleries />
  </>
);

export default GalleryPage;
