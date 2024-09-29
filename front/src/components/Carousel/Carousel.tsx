// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import AlertModal from "../Alert/AlertModal";
// import { useLoggin } from "@/context/logginContext";
// import { CarouselProps } from "./types";

// const Carousel: React.FC<CarouselProps> = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [redirectPath, setRedirectPath] = useState<string | null>(null);
//   const { userData } = useLoggin();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   const nextSlide = () =>
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   const prevSlide = () =>
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   const goToSlide = (index: number) => setCurrentIndex(index);

//   const handleLinkClick = (
//     path: string,
//     event: React.MouseEvent<HTMLAnchorElement>
//   ) => {
//     event.preventDefault();
//     setRedirectPath(path);

//     if (!userData) {
//       setShowModal(true);
//     } else {
//       window.location.href = path;
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     if (redirectPath) {
//       window.location.href = redirectPath;
//     }
//   };

//   return (
//     <div className="relative w-full h-[150px] overflow-hidden">
//       <div
//         className="absolute inset-0 flex transition-transform duration-500"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((image, index) => (
//           <a
//             key={index}
//             href={image.link}
//             onClick={(event) => handleLinkClick(image.link, event)}
//             className="w-full flex-shrink-0 relative h-[150px]"
//           >
//             <Image
//               src={image.src}
//               alt={`Slide ${index}`}
//               layout="fill"
//               objectFit="cover"
//               className="w-full h-full"
//             />
//           </a>
//         ))}
//       </div>

//       {/* Botón Anterior */}
//       <button
//         className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
//         onClick={prevSlide}
//       >
//         ‹
//       </button>
//       {/* Botón Siguiente */}
//       <button
//         className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
//         onClick={nextSlide}
//       >
//         ›
//       </button>

//       {/* Indicadores */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               index === currentIndex ? "bg-blue-500" : "bg-blue-300"
//             }`}
//             onClick={() => goToSlide(index)}
//           ></button>
//         ))}
//       </div>

//       {/* Modal de Alerta */}
//       {!userData && (
//         <AlertModal
//           show={showModal}
//           onClose={handleModalClose}
//           title="Navigate"
//           message="Do you want to navigate to the product page?"
//         />
//       )}
//     </div>
//   );
// };

// export default Carousel;


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
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;