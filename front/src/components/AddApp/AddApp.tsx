"use client";
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
    category: {
      id: "",
      price: 0,
    },
  };

  const [appointmentData, setAppointmentData] =
    useState<IAppointmentData>(initialData);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: "", message: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleAddAppointment = async () => {
    try {
      const selectedDate = new Date(appointmentData.date);
      const today = new Date();

      if (isNaN(selectedDate.getTime())) {
        setAlertContent({ title: "Error", message: "Fecha no válida." });
        setShowAlert(true);
        return;
      }

      const dayAfterToday = new Date(today);
      dayAfterToday.setDate(today.getDate() + 1);
      if (selectedDate < dayAfterToday) {
        setAlertContent({
          title: "Error",
          message: "La cita debe ser a partir del día siguiente.",
        });
        setShowAlert(true);
        return;
      }

      const dayOfWeek = selectedDate.getDay();
      if (dayOfWeek === 0) {
        setAlertContent({
          title: "Error",
          message: "No se pueden agendar citas los domingos.",
        });
        setShowAlert(true);
        return;
      }
      const hour = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();
      if (
        (hour < 8 || (hour === 12 && minutes > 0)) &&
        (hour < 13 || hour > 18)
      ) {
        setAlertContent({
          title: "Error",
          message:
            "La cita debe estar entre las 8:00 AM y las 12:00 PM o entre la 1:00 PM y las 6:00 PM.",
        });
        setShowAlert(true);
        return;
      }
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
        id: categoryId || appointmentData.category.id,
        name: "",
        price: appointmentData.category.price,
      };

      const appointmentPayload = {
        date: appointmentData.date,
        status: appointmentData.status,
        description: appointmentData.description,
        user: userData?.userData?.id || "",
        categoryId: categoryId || appointmentData.category.id,
        categoryPrice: appointmentData.category.price,
        userId: userIdObject,
        category: categoryObject,
      };

      const newAppointment = await createAppointment(appointmentPayload);
      console.log("Cita creada:", newAppointment);
      setAlertContent({ title: "Éxito", message: "Cita creada con éxito." });
      setShowSuccessModal(true);

      setTimeout(() => {
        router.push("/appointments");
      }, 4000);
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
    <div className="flex flex-col items-center md:flex-row md:justify-between">
      <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md max-w-lg mx-auto mt-10 md:mr-4"> {/* Añadido margen derecho en pantallas medianas */}
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
          showModal={showSuccessModal}
          handleClose={() => setShowSuccessModal(false)}
          title={alertContent.title}
          message={alertContent.message}
        />
  
        <AlertModal
          showModal={showAlert}
          handleClose={() => setShowAlert(false)}
          title={alertContent.title}
          message={alertContent.message}
        />
      </div>
  {/* ////////////////////////EL AVISO LOCO */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto mt-6 md:mt-0 md:max-w-xs md:ml-4"> {/* Ancho y margen para pantallas medianas */}
        <h3 className="text-lg font-bold text-center mb-2">Días y Horas de Atención al Cliente</h3>
        <p className="text-gray-700 text-center">De lunes a sábado de 8:00 AM a 12:00 PM y de 1:00 PM a 6:00 PM</p>

        <p className="text-xl font-bold text-center mt-4">RESERVA HOY TU CITA</p>
      </div>
    </div>
  );
  
};

export default AppointmentForm;
