import React from 'react';

import config from '../config/index.json';

const Partners = () => {
  const { partners } = config as any;
  const { title, items, description, closing } = partners;

  return (
    <section id="partners" className="relative bg-background py-12">
      {/* decorative gradient glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 transform -translate-x-1/2 h-48 w-48 bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500 opacity-10 filter blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-40 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-800 opacity-10 filter blur-3xl rounded-full" />

      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="w-full my-2 text-4xl sm:text-5xl font-extrabold leading-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500">
          {title}
        </h2>
        <div className="w-full mb-8">
          <div className="h-1 mx-auto bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500 w-64 opacity-40 my-0 py-0 rounded-t"></div>
        </div>
        {description && (
          <p className="mx-auto max-w-3xl text-center text-gray-700 mb-6">
            {description}
          </p>
        )}
        <ul className="mx-auto max-w-5xl flex flex-wrap justify-center gap-6">
          {items.map((partner: any) => (
            <li
              key={partner.name}
              className="group w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 flex flex-col items-center text-center"
            >
              <a
                href={partner.url}
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <div className="mx-auto h-16 sm:h-20 md:h-24 w-full flex items-center justify-center glass-panel gradient-border rounded-xl p-4 transform transition duration-200 group-hover:scale-105">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain logo-drop-strong filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  {partner.name}
                </p>
              </a>
            </li>
          ))}
        </ul>
        {closing && (
          <div className="mx-auto max-w-4xl mt-8 p-4 sm:p-6 rounded-xl glass-panel">
            <p className="text-center text-gray-700">{closing}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
