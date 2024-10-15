import React, { useState } from "react";
import { IAppointmentData } from "@/interfaces/Appointment";


interface EditAppointmentModalProps {
  appointment: IAppointmentData;
  onSave: (updatedAppointment: IAppointmentData) => void;
  onClose: () => void;
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({
  appointment,
  onSave,
  onClose,
}) => {
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: IAppointmentData["status"]) => {
    setUpdatedAppointment((prev) => ({ ...prev, status }));
  };

  const handleSave = () => {
    onSave(updatedAppointment);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Editar Cita</h2>
        <input
          type="datetime-local"
          name="date"
          value={new Date(updatedAppointment.date).toISOString().slice(0, -1)}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <textarea
          name="description"
          value={updatedAppointment.description}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <div className="flex justify-around mb-4">
          {["Pendiente", "Procesado", "Pagado"].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status as IAppointmentData["status"])}
              className={`px-4 py-2 rounded ${
                updatedAppointment.status === status
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
