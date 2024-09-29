// "use client";
// import React, { useState } from "react";
// import AlertModal from "../Alert/AlertModal";
// import CardsPropsAside from "./types";
// import { useLoggin } from "@/context/logginContext";
// import { useRouter } from "next/navigation";
// import Image from 'next/image';

// interface CardPropsAside extends CardsPropsAside {
//   id: string;
//   name: string;
//   imageUrl?: string;
//   hoverImageUrl?: string;
//   description?: string;
// }

// const AsideBar: React.FC<CardPropsAside> = ({ id, name, imageUrl, hoverImageUrl, description }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [redirectPath, setRedirectPath] = useState<string | null>(null);
//   const { userData } = useLoggin();
//   const router = useRouter();
//   const [isHovered, setIsHovered] = useState(false); // Estado para manejar el hover
//   const APIURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010';
  
  
//   const handleLinkClick = (path: string) => {
//     setRedirectPath(path);
//     console.log(id);
    
//     if (!userData) {
//       setShowModal(true);
//       router.push(path);
//     } else {
//       router.push(path);
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     if (redirectPath) {
//       router.push(redirectPath);
//     }
//   };

//   return (
//     <div
//       className={`flex flex-col justify-center items-center ${isHovered ? "bg-gray-900" : "bg-white"} border border-blue-500 rounded-lg shadow-lg shadow-blue-500/50 cursor-pointer mb-4 p-4 transition duration-300 ease-in-out`}
//       style={{ width: isHovered ? "320px" : "180px", height: "220px" }} 
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)} 
//       onClick={() => handleLinkClick(`${APIURL}/categories/${id}/products`)}
      
//     >
//       <div className="flex flex-col items-start p-4">
//         {isHovered ? (
          
//           <div className="flex flex-row items-center">
//           <Image
//             src={hoverImageUrl || '/default-image.jpg'} 
//             alt={name}
//             width={80}
//             height={80}
//             className="ml-4" 
//           />
//           <p className={`text-white ml-5`}>{description}</p>
//         </div>
//         ) : (
//           <Image
//             src={imageUrl || '/default-image.jpg'}
//             alt={name}
//             width={80}
//             height={80}
//           />
//         )}
//         <h5 className={`text-base font-bold tracking-tight ${isHovered ? "text-white" : "text-blue-700"}`}>
//           {name}
//         </h5>
//         {/* {description && (
//           <p className={`mt-2 ${isHovered ? "text-white" : "text-gray-600"}`}>{description}</p> // Cambiar el color de la descripción también
//         )} */}
//       </div>

//       {!userData && (
//         <AlertModal
//           show={showModal}
//           onClose={handleModalClose}
//           title="Visitor in JhonDay Solutions"
//           message="The best technological attention Register or Sign In"
//         />
//       )}
//     </div>
//   );
// };

// export default AsideBar;
'use client'
import React, { useState } from "react";
import AlertModal from "../Alert/AlertModal";
import CardsPropsAside from "./types";
import { useLoggin } from "@/context/logginContext";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import DatailProduct from "@/app/product/page";
interface CardPropsAside extends CardsPropsAside {
  id: string;
  name: string;
  imageUrl?: string;
  hoverImageUrl?: string;
  description?: string;
}

const AsideBar: React.FC<CardPropsAside> = ({ id, name, imageUrl, hoverImageUrl, description }) => {
  const [showModal, setShowModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const { userData } = useLoggin();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false); // Estado para manejar el hover
  const APIURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010';
  
  const handleLinkClick = async (id: string) => {
    const products = await fetch(`${APIURL}/categories/${id}/products`);
    const data = await products.json();
    return <DatailProduct products={data} />;
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (redirectPath) {
      router.push(redirectPath);
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center ${isHovered ? "bg-gray-900" : "bg-white"} border border-blue-500 rounded-lg shadow-lg shadow-blue-500/50 cursor-pointer mb-4 p-4 transition duration-300 ease-in-out`}
      style={{ width: isHovered ? "320px" : "180px", height: "220px" }} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
      onClick={() => handleLinkClick(id)}
      
    >
      <div className="flex flex-col items-start p-4">
        {isHovered ? (
          
          <div className="flex flex-row items-center">
          <Image
            src={hoverImageUrl || '/default-image.jpg'} 
            alt={name}
            width={80}
            height={80}
            className="ml-4" 
          />
          <p className={`text-white ml-5`}>{description}</p>
        </div>
        ) : (
          <Image
            src={imageUrl || '/default-image.jpg'}
            alt={name}
            width={80}
            height={80}
          />
        )}
        <h5 className={`text-base font-bold tracking-tight ${isHovered ? "text-white" : "text-blue-700"}`}>
          {name}
        </h5>
        {/* {description && (
          <p className={`mt-2 ${isHovered ? "text-white" : "text-gray-600"}`}>{description}</p> // Cambiar el color de la descripción también
        )} */}
      </div>

      {!userData && (
        <AlertModal
          show={showModal}
          onClose={handleModalClose}
          title="Visitor in JhonDay Solutions"
          message="The best technological attention Register or Sign In"
        />
      )}
    </div>
  );
};

export default AsideBar;