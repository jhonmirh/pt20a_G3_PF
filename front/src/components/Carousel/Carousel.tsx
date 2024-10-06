'use client'; // Make sure to keep this if you're using hooks in a client component

import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  {
    src: "https://res.cloudinary.com/dgsk4faek/image/upload/v1727550298/carousel/eosses4astr0jfpl4xty.jpg",
  },
  {
    src: "https://res.cloudinary.com/dgsk4faek/image/upload/v1727549838/carousel/uaobiquq2nopuxiqvige.jpg",
  },
  {
    src: "https://res.cloudinary.com/dgsk4faek/image/upload/v1727550298/carousel/eosses4astr0jfpl4xty.jpg",
  },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia el tiempo de intervalo a 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[170px] overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative h-[150px]"
          >
            <Image
              src={image.src}
              alt={`Slide ${index}`}
              fill // Use fill instead of layout="fill"
              className="w-full h-full object-cover" // Use object-cover with CSS
              style={{ objectFit: 'cover' }} // Maintain the cover style
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
