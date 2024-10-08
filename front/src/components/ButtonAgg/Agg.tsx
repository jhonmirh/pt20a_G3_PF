
'use client'

import React, { useState } from "react";
import AlertModal from "../Alert/AlertModal";
import { useRouter } from "next/navigation";
import ICategory from "@/interfaces/Category";

const Agg = ({ category }: { category: ICategory }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const router = useRouter();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Evitar que el clic se propague

    try {
      const appointmentIds: string[] = JSON.parse(localStorage.getItem("appointment") || "[]");

      // Verificamos si el id del producto ya está en las citas
      const isProductInAppointment = appointmentIds.includes(category.id);

      if (isProductInAppointment) {
        // Mostrar modal si el producto ya está en las citas
        setModalContent({
          title: "Revisa tus Citas",
          message: "El Servicio Tiene Citas Pendientes",
        });
        setShowModal(true);
      } else {
        // Redirigir al formulario con el categoryId como parámetro en la URL
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
        show={showModal}
        onClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    </>
  );
};

export default Agg;
