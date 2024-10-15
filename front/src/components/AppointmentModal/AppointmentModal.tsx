'use client'
import React from "react";
import { UserProps } from "@/interfaces/Appointment";
import { useState } from "react";

interface AppointmentModalProps {
  appointment: IAppointment;
  onSave: (appointment: IAppointment) => Promise<void>;
  onClose: () => void;
}

interface IAppointment {
  id: string;
  date: string;
  description: string;
  price: number;
  user: UserProps;
  categoryId: string;
  status: "Pendiente" | "Procesado" | "Pagado";
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ appointment, onSave, onClose }) => {
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedAppointment((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Editar Cita</h2>
        <input
          type="datetime-local"
          name="date"
          value={new Date(updatedAppointment.date).toISOString().slice(0, 16)}
          onChange={handleChange}
          className="mb-4 p-2 border w-full"
        />
        <textarea
          name="description"
          value={updatedAppointment.description}
          onChange={handleChange}
          className="mb-4 p-2 border w-full"
        />
        <div className="flex space-x-4">
          <button onClick={() => onSave(updatedAppointment)} className="bg-green-600 text-white px-4 py-2 rounded">
            Guardar
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;