"use client";

import React, { useEffect, useState } from "react";
import { useLoggin } from "@/context/logginContext";
import AlertModal from "../Alert/AlertModal"; 
import { useRouter } from "next/navigation"; // Para redireccionar al login

const DataUser = () => {
  const { userData } = useLoggin(); // Obtén la data del contexto
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

  // Función para verificar si todos los datos están completos
  const isUserDataComplete = () => {
    return userData && 
      userData.userData?.name && 
      userData.userData?.email && 
      userData.userData?.age && 
      userData.userData?.phone && 
      userData.userData?.city && 
      userData.userData?.address;
  };

  useEffect(() => {
    console.log("User Data:", userData);
  }, [userData]);


  useEffect(() => {
    if (!userData) {
      setModalContent({
        title: "Acceso denegado",
        message: "Debes iniciar sesión para ver tus perfiles",
      });
      setShowModal(true); 
    }else if (!isUserDataComplete()) {
      setModalContent({
        title: "Datos incompletos",
        message: "Debes completar tus datos para ver tu perfil.",
      });
      setShowModal(true);
    }
  }, [userData]);

  const handleCloseModal = () => {
    setShowModal(false);
    router.push(userData ? "/completar-perfil" :"/login"); 
  };

  if (!userData || !isUserDataComplete()) {
    return (
      <AlertModal
        showModal={showModal}
        handleClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    );
  }

  return (
    <>
      <hr className="border-t-4 border-green-950 my-4 mx-auto w-full sm:w-3/4 lg:w-1/2" />
      <div className="flex flex-col justify-between m-10 p-4 max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
            Tus datos personales
          </h2>
        </div>
      </div>

      <div className="flex flex-col justify-between m-10 p-4 max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700">
        <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-900">Nombre y apellido: <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData?.name}
        </span></label>
        <label  htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900">Correo Electrónico:<span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData?.email}
        </span></label>
        <label htmlFor="age"className="block mb-2 text-sm font-bold text-gray-900">Edad: <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData?.age}
        </span></label>
        <label htmlFor="phone" className="block mb-2 text-sm font-bold text-gray-900">Teléfono: <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData?.phone}
        </span></label>
        <label htmlFor="city" className="block mb-2 text-sm font-bold text-gray-900">Ciudad: <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData?.city}
        </span></label>
        <label htmlFor="address" className="block mb-2 text-sm font-bold text-gray-900">Dirección: <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData?.address}
        </span></label>
        {/* <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData.ordes}
        </span> */}
      </div>
    </>
  );
};

export default DataUser;
