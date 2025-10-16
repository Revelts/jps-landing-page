import React from 'react';

import { Carousel } from 'react-responsive-carousel';

import config from '../config/index.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type Member = {
  name: string;
  role: string;
  photo: string;
  links?: {
    facebook?: string;
    x?: string;
    instagram?: string;
    linkedin?: string;
  };
};

const Team = () => {
  const { team } = config as any;
  const members: Member[] = team?.members || [];
  const slides: Member[][] = [];
  for (let i = 0; i < members.length; i += 3) {
    slides.push(members.slice(i, i + 3));
  }

  return (
    <section id="team" className="relative bg-background py-12">
      {/* decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-10 left-10 h-40 w-40 bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500 opacity-10 filter blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-8 right-16 h-44 w-44 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-800 opacity-10 filter blur-3xl rounded-full" />

      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="w-full my-2 text-4xl sm:text-5xl font-extrabold leading-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500">
          {team?.title || 'Meet Our Team'}
        </h2>
        <div className="w-full mb-8">
          <div className="h-1 mx-auto bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500 w-64 opacity-40 my-0 py-0 rounded-t" />
        </div>

        <div className="relative w-full mx-auto">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            emulateTouch
            className="rounded-2xl shadow-2xl"
            renderArrowPrev={(onClickHandler: any, hasPrev: boolean) =>
              hasPrev ? (
                <button
                  type="button"
                  onClick={onClickHandler}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-900 text-white rounded-full p-3 sm:p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition z-10"
                  aria-label="Previous"
                >
                  &#8592;
                </button>
              ) : null
            }
            renderArrowNext={(onClickHandler: any, hasNext: boolean) =>
              hasNext ? (
                <button
                  type="button"
                  onClick={onClickHandler}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-purple-700 hover:bg-purple-900 text-white rounded-full p-3 sm:p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition z-10"
                  aria-label="Next"
                >
                  &#8594;
                </button>
              ) : null
            }
          >
            {slides.map((group: Member[], idx: number) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {group.map((m: Member) => (
                  <article
                    key={m.name}
                    className="relative overflow-hidden rounded-2xl p-6 sm:p-8 glass-panel gradient-border h-full"
                  >
                    {/* corner color waves */}
                    <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-orange-400 via-rose-400 to-pink-500 opacity-40 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-gray-400 opacity-20 blur-2xl" />

                    <div className="relative flex flex-col items-center text-center">
                      <div className="relative h-36 w-36 rounded-full p-1 bg-white/50 shadow-xl">
                        <img
                          src={m.photo}
                          alt={m.name}
                          className="h-full w-full rounded-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <h3 className="mt-6 text-xl font-semibold text-gray-900">
                        {m.name}
                      </h3>
                      <p className="text-sm text-gray-600">{m.role}</p>

                      <div className="mt-5 flex items-center gap-5 text-gray-700">
                        {m?.links?.facebook && (
                          <a
                            href={m.links.facebook}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook"
                            className="icon-link hover:text-blue-700 transition"
                          >
                            {/* Facebook icon */}
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.91h-2.32V22c4.78-.81 8.44-4.95 8.44-9.94z" />
                            </svg>
                          </a>
                        )}
                        {m?.links?.x && (
                          <a
                            href={m.links.x}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="X"
                            className="icon-link hover:text-gray-900 transition"
                          >
                            {/* X icon */}
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M18.9 2H22l-7.07 8.07L22.5 22h-6.87l-4.8-6.76L5.3 22H2l7.56-8.63L1.8 2h6.98l4.3 6.02L18.9 2zm-2.4 18h1.88L7.6 4H5.77l10.73 16z" />
                            </svg>
                          </a>
                        )}
                        {m?.links?.instagram && (
                          <a
                            href={m.links.instagram}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            className="icon-link hover:text-pink-700 transition"
                          >
                            {/* Instagram icon */}
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.9.25 2.3.42.6.24 1 .53 1.5.99.46.46.75.9.99 1.5.17.4.36 1.1.42 2.3.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.9-.42 2.3a3.9 3.9 0 0 1-.99 1.5 3.9 3.9 0 0 1-1.5.99c-.4.17-1.1.36-2.3.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.9-.25-2.3-.42-.6-.24-1-.53-1.5-.99a3.9 3.9 0 0 1-.99-1.5c-.17-.4-.36-1.1-.42-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.9.42-2.3.24-.6.53-1 .99-1.5.46-.46.9-.75 1.5-.99.4-.17 1.1-.36 2.3-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.8.07-.98.05-1.5.21-1.9.35-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.39-.3.92-.35 1.9-.07 1.3-.07 1.7-.07 4.8s0 3.5.07 4.8c.05.98.21 1.5.35 1.9.18.47.4.8.75 1.15.35.35.68.57 1.15.75.39.14.92.3 1.9.35 1.3.07 1.7.07 4.8.07s3.5 0 4.8-.07c.98-.05 1.5-.21 1.9-.35.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.39.3-.92.35-1.9.07-1.3.07-1.7.07-4.8s0-3.5-.07-4.8c-.05-.98-.21-1.5-.35-1.9a2.6 2.6 0 0 0-.75-1.15 2.6 2.6 0 0 0-1.15-.75c-.39-.14-.92-.3-1.9-.35-1.3-.07-1.7-.07-4.8-.07zm0 3.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm5-3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
                            </svg>
                          </a>
                        )}
                        {m?.links?.linkedin && (
                          <a
                            href={m.links.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className="icon-link hover:text-blue-800 transition"
                          >
                            {/* LinkedIn icon */}
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.06c.53-1 1.84-2.2 3.78-2.2 4.04 0 4.79 2.66 4.79 6.12V24h-4v-7.1c0-1.7-.03-3.88-2.37-3.88-2.37 0-2.73 1.85-2.73 3.76V24h-4V8z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Team;
