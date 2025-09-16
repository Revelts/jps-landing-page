import React from 'react';

import config from '../config/index.json';

const MainHeroImage = () => {
  const { mainHero } = config;
  return (
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        className="h-48 w-full object-cover sm:h-64 md:h-80 lg:w-full lg:h-full"
        src={mainHero.img}
        alt="happy team image"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default MainHeroImage;
