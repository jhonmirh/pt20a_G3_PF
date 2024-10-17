'use client'

import React, { useState } from "react";
import AlertModal from "../Alert/AlertModal"; 
import { useRouter } from "next/navigation";
import ICategory from "@/interfaces/Category";

const Agg: React.FC<{ category: ICategory }> = ({ category }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const router = useRouter();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      const appointmentIds: string[] = JSON.parse(localStorage.getItem("appointment") || "[]");
      const isProductInAppointment = appointmentIds.includes(category.id);

      if (isProductInAppointment) {
        setModalContent({
          title: "Revisa tus Citas",
          message: "El Servicio Tiene Citas Pendientes",
        });
        setShowModal(true);
      } else {
        router.push(`/appointment?categoryId=${category.id}`);
      }
    } catch (error) {
      console.error("Cart Error Warning", error);
      setModalContent({
        title: "Atención: Se presentó un error",
        message: "Ocurrió un error agregando la cita",
      });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition-colors"
      >
        Agregar Cita
      </button>
      <AlertModal
        showModal={showModal}
        handleClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    </>
  );
};

export default Agg;