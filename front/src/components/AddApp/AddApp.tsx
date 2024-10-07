"use client";

import React, { useState, useEffect } from "react";
import { IAppointmentData } from "@/interfaces/Appointment";
import { createAppointment } from "@/helpers/appointment.helper";
import { useLoggin } from "@/context/logginContext";
import AlertModal from "../Alert/AlertModal";

const AppointmentForm = () => {
  const { userData } = useLoggin();
  const [appointmentData, setAppointmentData] = useState<IAppointmentData>({
    id: "",
    date: "",
    description: "",
    userId: userData?.userData?.id || "",
    categoryId: "",
  });

  const [showModifyDelete, setShowModifyDelete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: "", message: "" });

  // Nuevo useEffect para obtener el productId desde localStorage y asignarlo
  useEffect(() => {
    const productData = localStorage.getItem("appointment");
    let categoryId = "";

    try {
      if (productData) {
        const parsedProductData = JSON.parse(productData);
        if (Array.isArray(parsedProductData)) {
          categoryId = parsedProductData[0]; // Suponiendo que el primer elemento es el categoryId
        } else {
          categoryId = parsedProductData; // Si no es un array, úsalo directamente
        }
      }
    } catch (error) {
      console.error("Error parsing product data from localStorage", error);
    }

    setAppointmentData(prevData => ({
      ...prevData,
      categoryId: categoryId
      }));
  }, []);


  const handleAddAppointment = async () => {
    const appointmentData = {
        date: '2024-10-08T21:09',
        description: 'sdfsdfdf',
        user: 'f885c803-1e3f-4bda-9ce3-dfaa7ad650c6',
        categoryId: 'c7111440-c052-419d-9a2b-387908f2549b', // Cambia a categoryId
    };

    try {
        const newAppointment = await createAppointment(appointmentData);
        console.log('Cita creada:', newAppointment);
    } catch (error) {
        console.error('Error creando la cita:', error);
    }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Agendar Cita</h2>

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Fecha y Hora
      </label>
      <input
        type="datetime-local"
        name="date"
        value={appointmentData.date}
        onChange={handleChange}
        className="mb-4 p-2 w-full border rounded"
        required
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Descripción
      </label>
      <input
        type="text"
        name="description"
        value={appointmentData.description}
        onChange={handleChange}
        className="mb-4 p-2 w-full border rounded"
        placeholder="Descripción de la cita"
        required
      />

      {/* Botones */}
      <div className="flex justify-around mt-6">
        <button
          onClick={handleAddAppointment}
          className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Agregar Cita
        </button>

        {showModifyDelete && (
          <>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
              Modificar Cita
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-400 transition-colors">
              Eliminar Cita
            </button>
          </>
        )}
      </div>

      <AlertModal
        show={showAlert}
        onClose={() => setShowAlert(false)}
        title={alertContent.title}
        message={alertContent.message}
      />
    </div>
  );
};

export default AppointmentForm;
