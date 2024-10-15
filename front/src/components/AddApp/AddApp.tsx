'use client';
import React, { useState } from "react";
import { IAppointmentData } from "@/interfaces/Appointment";
import { createAppointment } from "@/helpers/appointment.helper";
import { useLoggin } from "@/context/logginContext";
import { useRouter, useSearchParams } from "next/navigation";

const AppointmentForm = () => {
  const { userData } = useLoggin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId: string = searchParams.get("categoryId") || "";

  const initialData: IAppointmentData = {
    id: "",
    date: "",
    description: "",
    status: "Pendiente",
    price: 0,
    user: {
      id: userData?.userData?.id || "",
      name: userData?.userData?.name || "",
      phone: userData?.userData?.phone || "",
      address: userData?.userData?.address || "",
      city: userData?.userData?.city || "",
    },
    categoryId: categoryId,
  };

  const [appointmentData, setAppointmentData] = useState<IAppointmentData>(initialData);

  const isValidAppointmentDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    const day = date.getUTCDay(); // 0 = Sunday, 6 = Saturday
    const hours = date.getUTCHours();
    
    // Validar que el día esté entre lunes (1) y viernes (5)
    if (day < 1 || day > 5) return false;

    // Validar que la hora esté entre 9 AM (9) y 6 PM (18)
    if (hours < 9 || hours > 17) return false;

    return true;
  };

  const handleAddAppointment = async () => {
    if (!isValidAppointmentDate(appointmentData.date)) {
      alert("Por favor, elige un horario entre 9 AM y 6 PM, de lunes a viernes");
      return;
    }

    try {
      const userIdObject = {
        id: userData?.userData?.id,
        name: userData?.userData?.name || "",
        email: userData?.userData?.email || "",
        password: "",
        age: userData?.userData?.age || 0,
        phone: userData?.userData?.phone || 0,
        city: userData?.userData?.city || "",
        address: userData?.userData?.address || "",
      };

      const categoryObject = {
        id: appointmentData.categoryId,
        name: "",
        price: 0,
      };

      const appointmentPayload = {
        date: appointmentData.date,
        status: appointmentData.status,
        description: appointmentData.description,
        user: userData?.userData?.id || "",
        categoryId: appointmentData.categoryId,
        userId: userIdObject,
        category: categoryObject,
      };

      const newAppointment = await createAppointment(appointmentPayload);
      console.log("Cita creada:", newAppointment);
    } catch (error) {
      console.error("Error creando la cita:", error);
      setAlertContent({ title: "Error", message: "Error creando la cita." });
      setShowAlert(true);
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

      <p className="mb-4 text-red-600">
        Horarios de atención: Lunes a Viernes, 9 AM a 6 PM.
      </p>

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
        min={new Date().toISOString().slice(0, 16)} // Limitar a la fecha actual
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
        showModal={showAlert}
        handleClose={() => setShowAlert(false)}
        title={alertContent.title}
        message={alertContent.message}
      />
    </div>
  );
};

export default AppointmentForm;
