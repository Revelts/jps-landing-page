import React from 'react';

import config from '../config/index.json';

const About = () => {
  const { about } = config;
  const { socialMedia } = about;

  return (
    <div
      id="about"
      className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-10 sm:py-12"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-x-8 mt-6 h-8 glass-panel rounded-xl px-6 py-4 gradient-border neon-shadow">
          <a
            aria-label="instagram"
            href={socialMedia.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="fill-current text-gray-800 dark:text-white hover:text-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM17.5 6a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
            </svg>
          </a>
          <a
            aria-label="tiktok"
            href={socialMedia.tiktok}
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="fill-current text-gray-800 dark:text-white hover:text-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M14 2h3c.12 1.37.76 2.47 1.7 3.35.86.81 1.94 1.33 3.3 1.55V10c-1.66-.05-3.06-.43-4.3-1.09v6.02c0 3.87-3.13 7.07-7 7.07s-7-3.2-7-7.07c0-3.62 2.76-6.67 6.3-7.04.57-.06 1.2-.05 1.7.02V11c-.33-.08-.74-.08-1.1.02-1.28.35-2.2 1.51-2.2 2.86 0 1.69 1.39 3.07 3.1 3.07 1.74 0 3.1-1.36 3.1-3.07V2z" />
            </svg>
          </a>
        </div>
        <div className="flex items-center mt-6">
          <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">
            &copy; {new Date().getFullYear()} designed by{' '}
            <a href="https://github.com/Revelts" rel="nofollow">
              Leynardo Yosef
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
