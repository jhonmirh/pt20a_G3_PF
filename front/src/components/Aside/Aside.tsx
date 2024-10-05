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
  ribbonText: string;
}

const AsideBar: React.FC<CardPropsAside> = ({
  id,
  name,
  imageUrl,
  hoverImageUrl,
  description,
  categoryId,
  ribbonText,
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
      className={`relative flex flex-col items-center transition-transform transform hover:scale-105 ${
        isHovered ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      } rounded-lg shadow-lg cursor-pointer mb-4 p-2 transition duration-300 ease-in-out`}
      style={{
        width: "150px",
        height: isHovered ? "300px" : "250px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: isHovered
          ? "rgba(17, 24, 39, 0.85)"
          : "rgba(255, 255, 255, 0.85)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleLinkClick(categoryId)}
    >
      <div className="flex flex-col items-center space-y-2 mt-5">
        <Image
          src={
            isHovered
              ? hoverImageUrl || "/default-image.jpg"
              : imageUrl || "/default-image.jpg"
          }
          alt={name}
          width={60}
          height={60}
        />

        <h5 className="text-sm font-bold text-center">{name}</h5>

        {isHovered && <p className="text-xs text-center px-2">{description}</p>}
      </div>

      <div
        className={`absolute bottom-0 w-full py-2 px-4 flex justify-between items-center ${
          isHovered ? "bg-white text-gray-900" : "bg-gray-900 text-white"
        } transition-colors duration-300`}
        style={{
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        <p className="text-xs font-semibold text-center leading-tight">
          {ribbonText}
        </p>
        <div
          className={`flex items-center justify-center rounded-full p-1 transition-colors duration-300 ${
            isHovered ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
          style={{ width: "24px", height: "24px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M12 5.25a.75.75 0 01.75.75v5.25h5.25a.75.75 0 010 1.5H12.75v5.25a.75.75 0 01-1.5 0V12.75H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {!userData && (
        <AlertModal
          show={showModal}
          onClose={handleModalClose}
          title="Visitante de JhonDay Soluciones"
          message="The best technological attention Register or Sign In"
        />
      )}
    </div>
  );
};

export default AsideBar;
