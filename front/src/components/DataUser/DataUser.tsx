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

  useEffect(() => {
    if (!userData) {
      setModalContent({
        title: "Access Denied",
        message: "You must be logged in to view your Profiles",
      });
      setShowModal(true); 
    }
  }, [userData]);

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/login"); 
  };

  if (!userData) {
    return (
      <AlertModal
        show={showModal}
        onClose={handleCloseModal}
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
            Your Profile User Data JhonDay
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
          {userData?.userData.ordes}
        </span>
      </div>
    </>
  );
};

export default DataUser;
