import React from 'react';

import config from '../config/index.json';
import Divider from './Divider';

const Product = () => {
  const { aboutus } = config;
  const [firstItem, secondItem] = aboutus.items;

  return (
    <section className={`bg-background py-8`} id="aboutus">
      <div className={`container max-w-5xl mx-auto m-8`}>
        <h1
          className={`w-full my-2 text-5xl font-extrabold leading-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500`}
        >
          {aboutus.title.split(' ').map((word, index) => (
            <span
              key={index}
              className={
                index % 2
                  ? 'bg-gradient-to-r from-blue-800 to-purple-500 bg-clip-text text-transparent'
                  : 'text-border'
              }
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <Divider />
        <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              className={`text-3xl text-gray-900 font-bold leading-none mb-3`}
            >
              {firstItem?.title}
            </h3>
            <p className={`text-gray-600`}>{firstItem?.description}</p>
          </div>
          <div className={`w-full sm:w-1/2 p-6`}>
            <div className="rounded-2xl overflow-hidden glass-panel gradient-border neon-shadow">
              <img
                className="h-6/6 w-full object-contain"
                src={firstItem?.img}
                alt={firstItem?.title}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <div className={`flex flex-wrap flex-col-reverse sm:flex-row`}>
          <div className={`w-full sm:w-1/2 p-6`}>
            <div className="rounded-2xl overflow-hidden glass-panel gradient-border neon-shadow">
              <img
                className="h-6/6 w-full object-contain"
                src={secondItem?.img}
                alt={secondItem?.title}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className={`w-full sm:w-1/2 p-6 mt-20`}>
            <div className={`align-middle`}>
              <h3
                className={`text-3xl text-gray-900 font-bold leading-none mb-3`}
              >
                {secondItem?.title}
              </h3>
              <p className={`text-gray-600 mb-8`}>{secondItem?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
