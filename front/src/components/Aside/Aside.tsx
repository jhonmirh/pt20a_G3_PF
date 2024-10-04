"use client";
import React, { useState } from "react";
import AlertModal from "../Alert/AlertModal";
import CardsPropsAside from "./types";
import { useLoggin } from "@/context/logginContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CardPropsAside extends CardsPropsAside {
  id: string;
  name: string;
  imageUrl?: string;
  hoverImageUrl?: string;
  description?: string;
  categoryId: string;
}

const AsideBar: React.FC<CardPropsAside> = ({
  id,
  name,
  imageUrl,
  hoverImageUrl,
  description,
  categoryId,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { userData } = useLoggin();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const APIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010";

  const handleLinkClick = async (categoryId: string) => {
    try {
      const response = await fetch(
        `${APIURL}/categories/${categoryId}/products`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      router.push(`/categories/${categoryId}`);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`flex flex-col justify-center items-center transition-transform transform hover:scale-125 ${
        isHovered ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } rounded-full shadow-lg cursor-pointer mb-4 p-4 transition duration-300 ease-in-out`}
      style={{
        width: isHovered ? "220px" : "160px", // Crece al hacer hover
        height: isHovered ? "220px" : "160px", // Ajuste dinámico del tamaño del círculo
        border: "none", // Sin borde
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Sombra sutil para dar efecto 3D
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleLinkClick(categoryId)}
    >
      <div className="flex flex-col items-center p-2">
        <Image
          src={
            isHovered
              ? hoverImageUrl || "/default-image.jpg"
              : imageUrl || "/default-image.jpg"
          }
          alt={name}
          width={isHovered ? 80 : 50} // Cambia el tamaño de la imagen al hacer hover
          height={isHovered ? 80 : 50}
          className="rounded-full" // Imagen redonda
        />
        <h5 className="text-xs font-bold text-center mt-2">{name}</h5>{" "}
        {/* Tamaño del texto más pequeño */}
        {isHovered && (
          <p className="text-xs text-white text-center mt-1">{description}</p> // Verifica esta línea
        )}
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
