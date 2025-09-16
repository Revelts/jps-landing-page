import React from 'react';

import config from '../config/index.json';

const Benefits = () => {
  const { benefits } = config;
  const { title, subtitle, description, items: benefitsList } = benefits;
  return (
    <div className={`py-12 bg-background`} id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2
            className={`text-base text-primary font-semibold tracking-wide uppercase`}
          >
            {title}
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight gradient-text-bpp sm:text-4xl">
            {subtitle}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            {description}
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {benefitsList.map((feature) => (
              <div
                key={feature.name}
                className="relative glass-panel rounded-2xl p-6 gradient-border neon-shadow"
              >
                <dt>
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10 border border-white border-opacity-20`}
                    >
                      <img
                        className={`inline-block h-6 w-6`}
                        src={feature.icon}
                        alt={feature.name}
                      />
                    </div>
                    <p className="text-lg leading-6 font-semibold text-gray-900">
                      {feature.name}
                    </p>
                  </div>
                </dt>
                <dd className="mt-3 text-base text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
