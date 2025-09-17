import React, { useRef, useState } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
  '/assets/images/2.jpg',
  '/assets/images/3.jpg',
  '/assets/images/4.jpg',
  '/assets/images/5.jpg',
  '/assets/images/6.jpg',
  '/assets/images/7.jpg',
  '/assets/images/9.jpg',
  '/assets/images/10.jpg',
  '/assets/images/11.jpg',
];

const Gallery = () => {
  const carouselRef = useRef<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);

  // Overlay arrows are rendered via renderArrowPrev/renderArrowNext

  return (
    <section className="bg-background py-8" id="gallery">
      <div className="container mx-auto px-2 pt-4 pb-12">
        <h1 className="w-full my-2 text-3xl sm:text-5xl font-extrabold leading-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500">
          Gallery
        </h1>
        <div className="w-full mb-8">
          <div className="h-1 mx-auto bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500 w-64 opacity-40 my-0 py-0 rounded-t"></div>
        </div>

        {/* Carousel full-width within container with overlay arrows */}
        <div className="relative w-full max-w-4xl mx-auto">
          <Carousel
            ref={carouselRef}
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={3000}
            showStatus={false}
            dynamicHeight={false}
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
            {images.map((src, idx) => (
              <div
                key={idx}
                className="relative w-full h-56 sm:h-72 md:h-[22rem] lg:h-[28rem] xl:h-[32rem] overflow-hidden rounded-2xl bg-background cursor-pointer"
                onClick={() => {
                  setModalImg(src as string);
                  setModalOpen(true);
                }}
              >
                <img
                  src={src}
                  alt={`Gallery image ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Modal for image preview */}
        {modalOpen && modalImg && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="relative max-w-5xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-800 text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 z-10"
                aria-label="Close"
              >
                &times;
              </button>
              <img
                src={modalImg}
                alt="Preview"
                className="w-full h-[36rem] object-contain rounded-2xl bg-background"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
