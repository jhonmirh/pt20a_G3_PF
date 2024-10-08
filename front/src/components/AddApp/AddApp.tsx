
'use client'

import React, { useState } from "react";
import { IAppointmentData } from "@/interfaces/Appointment";
import { createAppointment } from "@/helpers/appointment.helper";
import { useLoggin } from "@/context/logginContext";
import AlertModal from "../Alert/AlertModal";
import { useRouter, useSearchParams } from "next/navigation";

const AppointmentForm = () => {
  const { userData } = useLoggin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId: string = searchParams.get('categoryId') || ''; // Siempre obtener de los parámetros de la URL

  const initialData: IAppointmentData = {
    date: "",
    description: "",
    user  : userData?.userData?.id || "",
    categoryId: categoryId, // Usa el categoryId correctamente desde los parámetros
  };

  const [appointmentData, setAppointmentData] = useState<IAppointmentData>(initialData);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: "", message: "" });

  const handleAddAppointment = async () => {
    try {
      const userIdObject = {
        id: userData?.userData?.id,   // UUID del usuario
        name: userData?.userData?.name || '', // Si está disponible
        email: userData?.userData?.email || '',
        password: '',  // Puedes decidir si incluir esto o no
        age: userData?.userData?.age || 0,  // Asegúrate de incluir un valor predeterminado si no existe
        phone: userData?.userData?.phone || 0,
        city: userData?.userData?.city || '',
        address: userData?.userData?.address || ''
      };
  
      const categoryObject = {
        id: appointmentData.categoryId,  // UUID de la categoría
        name: ''  // Si tienes el nombre de la categoría, lo puedes incluir aquí
      };
  
      const appointmentPayload = {
        date: appointmentData.date,
        description: appointmentData.description,
        user: userData?.userData?.id || '',  // UUID del usuario
        categoryId: appointmentData.categoryId,  // UUID de la categoría
        userId: userIdObject,  // Objeto con detalles del usuario
        category: categoryObject // Objeto con detalles de la categoría
      };
  
      const newAppointment = await createAppointment(appointmentPayload);
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

      <div className="flex justify-around mt-6">
        <button
          onClick={handleAddAppointment}
          className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          Agregar Cita
        </button>
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
