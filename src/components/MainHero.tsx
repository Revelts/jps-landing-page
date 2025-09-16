import React from 'react';

import config from '../config/index.json';

const MainHero = () => {
  const { mainHero } = config;
  return (
    <main className="mt-8 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-14 lg:mt-20 lg:px-8 xl:mt-24">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-extrabold gradient-text-bpp">
          <span className="block xl:inline">{mainHero.title}</span>{' '}
          <span
            className={`block xl:inline text-4xl bg-gradient-to-r from-blue-800 to-purple-500 bg-clip-text text-transparent`}
          >
            {mainHero.subtitle}
          </span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
          {mainHero.description}
        </p>
        <div className="mt-4 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <a
              href={mainHero.primaryAction.href}
              target="_blank"
              rel="noreferrer"
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-gradient-to-r from-blue-800 to-purple-500 hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10 btn-glow`}
            >
              {mainHero.primaryAction.text}
            </a>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <a
              href={mainHero.secondaryAction.href}
              target="_blank"
              rel="noreferrer"
              className={`w-full flex items-center justify-center px-8 py-3 border text-base font-medium rounded-md border-primary text-secondary bg-background hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10 glass-panel gradient-border btn-glow`}
            >
              {mainHero.secondaryAction.text}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHero;
