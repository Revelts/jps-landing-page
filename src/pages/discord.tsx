import { useEffect } from 'react';

import { NextSeo } from 'next-seo';
import Head from 'next/head';

const DISCORD_URL = 'https://discord.gg/UshBBJkDS8';

const DiscordPage = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.replace(DISCORD_URL);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <NextSeo
        title="Join the Jakarta Party Squad Discord Server"
        description="Bergabung dengan komunitas Discord Jakarta Party Squad. Temukan event, ngobrol, dan kolaborasi bareng komunitas nightlife Jakarta."
        canonical="https://jakartapartysquad.com/discord"
        openGraph={{
          url: 'https://jakartapartysquad.com/discord',
          title: 'Join the Jakarta Party Squad Discord Server',
          description:
            'Bergabung dengan komunitas Discord Jakarta Party Squad. Temukan event, ngobrol, dan kolaborasi bareng komunitas nightlife Jakarta.',
          images: [
            {
              url: 'https://jakartapartysquad.com/assets/images/header.jpg',
              width: 1200,
              height: 630,
              alt: 'Jakarta Party Squad',
            },
          ],
          site_name: 'Jakarta Party Squad',
        }}
        twitter={{ cardType: 'summary_large_image' }}
        additionalMetaTags={[{ name: 'robots', content: 'index,follow' }]}
      />
      <Head>
        <meta httpEquiv="refresh" content={`0; URL=${DISCORD_URL}`} />
        <link rel="canonical" href="https://jakartapartysquad.com/discord" />
      </Head>
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Redirecting to Discord…</h1>
        <p>
          If you are not redirected automatically,{' '}
          <a href={DISCORD_URL}>click here to join</a>.
        </p>
      </main>
    </>
  );
};

export default DiscordPage;
