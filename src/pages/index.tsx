import React from 'react';

import type { GetStaticProps } from 'next';

import About from '../components/About';
import AboutUs from '../components/AboutUs';
import Albums from '../components/Albums';
import Analytics from '../components/Analytics';
import Benefits from '../components/Benefits';
import Canvas from '../components/Canvas';
import FounderSpeech from '../components/FounderSpeech';
import Galleries from '../components/Galleries';
import Header from '../components/Header';
import LazyShow from '../components/LazyShow';
import MainHero from '../components/MainHero';
import MainHeroImage from '../components/MainHeroImage';
import Partners from '../components/Partners';
import VisitCounter from '../components/VisitCounter';

const App = () => {
  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`}>
      <div className={`relative bg-background`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <Header />
            <MainHero />
          </div>
        </div>
        <MainHeroImage />
      </div>
      <Canvas />
      <LazyShow>
        <VisitCounter />
      </LazyShow>
      <LazyShow>
        <>
          <AboutUs />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Partners />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Benefits />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Albums />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Galleries />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <FounderSpeech />
      </LazyShow>
      <LazyShow>
        <>
          <Canvas />
          <About />
        </>
      </LazyShow>
      <Analytics />
    </div>
  );
};

export default App;

export const getStaticProps: GetStaticProps = async () => {
  // In case of external data fetching, do it here.
  return {
    props: {},
    // Re-generate the page at most once every 60 minutes
    revalidate: 3600,
  };
};
