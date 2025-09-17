import React from 'react';

import config from '../config/index.json';

const FounderSpeech = () => {
  const { founderSpeech } = config as any;
  if (!founderSpeech) return null;
  const { title, name, avatar, speech } = founderSpeech as {
    title: string;
    name: string;
    avatar: string;
    speech: string;
  };

  return (
    <section id="founder" className="relative bg-background py-12">
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className="w-full my-2 text-4xl sm:text-5xl font-extrabold leading-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500">
          {title}
        </h2>
        <div className="w-full mb-8">
          <div className="h-1 mx-auto bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500 w-64 opacity-40 my-0 py-0 rounded-t"></div>
        </div>

        <div className="mx-auto max-w-3xl glass-panel gradient-border rounded-2xl p-6 sm:p-8 text-center">
          <img
            src={avatar}
            alt={name}
            className="mx-auto h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover shadow-lg mb-4"
            loading="lazy"
            decoding="async"
          />
          <p className="text-lg sm:text-xl font-semibold text-gray-800">{name}</p>
          <p className="mt-3 text-base sm:text-lg text-gray-700 whitespace-pre-line">{speech}</p>
        </div>
      </div>
    </section>
  );
};

export default FounderSpeech;


