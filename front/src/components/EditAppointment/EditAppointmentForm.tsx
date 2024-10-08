"use client";
import { useState } from "react";
import AppointmentProps from "@/interfaces/Appointment";
interface EditAppointmentFormProps {
  appointment: AppointmentProps;
  onSave: (updatedAppointment: AppointmentProps) => void;
  onCancel: () => void;
}

const EditAppointmentForm: React.FC<EditAppointmentFormProps> = ({
  appointment,
  onSave,
  onCancel,
}) => {
  const [description, setDescription] = useState(appointment.description);
  const [date, setDate] = useState(appointment.date);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAppointment = { ...appointment, description, date };
    onSave(updatedAppointment);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Editar Cita</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Descripción</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Fecha</label>
            <input
              type="datetime-local"
              value={new Date(date).toISOString().slice(0, 16)}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentForm;
