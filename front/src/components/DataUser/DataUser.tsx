"use client"; 

import React, { useEffect, useState, useCallback } from "react";
import { useLoggin } from "@/context/logginContext";
import AlertModal from "../Alert/AlertModal";
import { useRouter } from "next/navigation";
import EditUserForm from "../Modal/Modal";
import { IUsersUpdate } from "@/interfaces/LoginRegister";

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  password: string;
  phone: number; 
  address: string;
  city: string;
  admin: boolean;
}

interface UserSession {
  token: string;
  userData: User;
}

const DataUser = () => {
  const { userData, setUserData } = useLoggin();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [alertSaveModal, setAlertSaveModal] = useState(false);

  const isUserDataComplete = useCallback(() => {
    return (
      userData &&
      userData.userData?.name &&
      userData.userData?.email &&
      userData.userData?.age &&
      userData.userData?.phone !== undefined &&
      userData.userData?.city &&
      userData.userData?.address
    );
  }, [userData]);

  useEffect(() => {
    if (!userData?.token) {
      setModalContent({
        title: "Acceso Denegado",
        message: "Debe estar Logueado para Acceder a Este Espacio",
      });
      setShowModal(true);
    } else if (!isUserDataComplete()) {
      setModalContent({
        title: "Datos incompletos",
        message: "Debes completar tus datos para ver tu perfil.",
      });
      setShowModal(true);
    }
  }, [userData, isUserDataComplete]);

  const handleCloseModal = () => {
    setShowModal(false);
    router.push(userData ? "/completar-perfil" : "/login");
  };

  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleSaveChanges = async (updatedUser: IUsersUpdate) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userData?.userData?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData?.token}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );
  
      if (response.ok) {
        const updatedData: IUsersUpdate = await response.json();
  
        // Actualiza el contexto con los nuevos datos
        setUserData((prev: UserSession | null) => {
          if (prev) {
            const newUserData: UserSession = {
              ...prev,
              userData: {
                ...prev.userData,
                ...updatedData,
                phone: Number(updatedData.phone),
              },
            };
            return newUserData;
          }
          return null;
        });
  
        setAlertSaveModal(true);
        handleCloseEditModal(); 
      } else {
        console.error("Error al actualizar el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
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
     <hr className="border-t-4 border-white my-4 mx-auto w-full sm:w-3/4 lg:w-1/2" />
      <div className="flex flex-col justify-between m-10 p-4 max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-800 dark:bg-gray-600  dark:border-gray-700">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
            Perfil de {userData?.userData.name} en JhonDay 
          </h2>
        </div>
      </div>

      <div className="flex flex-col justify-between m-10 p-4 max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow-lg shadow-green-800 dark:bg-green-800 dark:border-gray-700">
        <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData.name}
        </span>
        <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData.email}
        </span>
        <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData.phone}
        </span>
        <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData.age}
        </span>
        <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData.city}
        </span>
        <span className="block mb-2 text-sm font-bold text-green-900 dark:text-white">
          {userData?.userData.address}
        </span>
        
      <button
        onClick={handleOpenEditModal}
        className="mt-4 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Editar Perfil
      </button>
      </div>

      {isEditModalOpen && (
        <EditUserForm
          users={userData.userData} 
          onSave={handleSaveChanges}
          onCancel={handleCloseEditModal}
        />
      )}

      {alertSaveModal && (
        <AlertModal
          showModal={alertSaveModal}
          handleClose={() => setAlertSaveModal(false)}
          title="Éxito"
          message="Los datos del usuario han sido modificados exitosamente."
        />
      )}
    </>
  );
};

export default DataUser;
