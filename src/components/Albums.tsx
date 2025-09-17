import React from 'react';

import config from '../config/index.json';

const Albums = () => {
  const { albums } = config as any;
  const { title, description, items } = albums;

  return (
    <section id="albums" className="relative bg-background py-12">
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
          {items.map(
            (album: {
              name: string;
              photo: string;
              url: string;
              date?: string;
            }) => (
              <li
                key={album.name}
                className="group w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 flex flex-col items-center text-center"
              >
                <a
                  href={album.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full"
                >
                  <div className="mx-auto h-24 sm:h-28 md:h-32 w-full flex items-center justify-center glass-panel gradient-border rounded-xl p-0 overflow-hidden transform transition duration-200 group-hover:scale-105">
                    <img
                      src={album.photo}
                      alt={album.name}
                      className="h-full w-full object-cover logo-drop-strong"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-gray-800">
                    {album.name}
                  </p>
                  {album.date && (
                    <p className="text-xs text-gray-500">
                      {new Date(album.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
};

export default Albums;
