'use client'; // Make sure to keep this if you're using hooks in a client component

import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  {
    src: "https://res.cloudinary.com/dgsk4faek/image/upload/v1728947775/carousel/dalawexubarqmhmpsrhw.jpg",
  },
  {
    src: "https://res.cloudinary.com/dgsk4faek/image/upload/v1728948073/carousel/uphzmu1et1ocnwvbhv69.jpg",
  },
  {
    src: "https://res.cloudinary.com/dgsk4faek/image/upload/v1728947775/carousel/dalawexubarqmhmpsrhw.jpg",
  },
  {
    src: "https://res.cloudinary.com/dgsk4faek/image/upload/v1728948073/carousel/uphzmu1et1ocnwvbhv69.jpg",
  },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

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
              fill 
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
