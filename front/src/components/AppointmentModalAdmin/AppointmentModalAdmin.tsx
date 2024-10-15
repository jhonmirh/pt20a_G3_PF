import React, { useEffect, useState } from "react";
import { IAppointmentData } from "@/interfaces/Appointment";
import { UserProps } from "@/interfaces/Appointment";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import { useLoggin } from "@/context/logginContext";

interface AppointmentModalProps {
  appointment: IAppointmentData[];
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

const AppointmentModalAdmin: React.FC<AppointmentModalProps> = ({
  appointment,
  onClose,
}) => {
  const { userData } = useLoggin();
  const [appointments, setAppointments] = useState<IAppointment[]>(appointment);
  const [editingAppointment, setEditingAppointment] =
    useState<IAppointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para los filtros
  const [filterDate, setFilterDate] = useState("");
  const [filterDescription, setFilterDescription] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Filtrar las citas
  const filteredAppointments = appointments.filter((app) => {
    const matchesDate = filterDate ? new Date(app.date).toLocaleDateString() === new Date(filterDate).toLocaleDateString() : true;
    const matchesDescription = app.description.toLowerCase().includes(filterDescription.toLowerCase());
    const matchesStatus = filterStatus ? app.status === filterStatus : true;

    return matchesDate && matchesDescription && matchesStatus;
  });

  const handleEdit = (appointment: IAppointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleModalSave = async (updatedAppointment: IAppointment) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${updatedAppointment.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userData?.token || ""}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAppointment),
        }
      );

      if (!response.ok) throw new Error("Error al guardar cambios");

      const data = await response.json();
      setAppointments((prev) =>
        prev.map((app) => (app.id === data.id ? data : app))
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  const handleStatusChange = async (
    id: string,
    status: IAppointmentData["status"]
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userData?.token || ""}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error al actualizar estado: ${response.statusText}`);
      }

      const updatedAppointment = await response.json();
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === updatedAppointment.id ? updatedAppointment : app
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      alert("No se pudo guardar el estado. Por favor, inténtalo de nuevo.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userData?.token || ""}` },
      });

      setAppointments((prev) => prev.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl text-center text-gray-900 mb-4">
          Citas del Usuario
        </h2>
        
        {/* Filtros */}
        <div className="mb-4">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border p-2 rounded mr-2"
            placeholder="Filtrar por Fecha"
          />
          <input
            type="text"
            value={filterDescription}
            onChange={(e) => setFilterDescription(e.target.value)}
            className="border p-2 rounded mr-2"
            placeholder="Filtrar por Descripción"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Filtrar por Status</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Procesado">Procesado</option>
            <option value="Pagado">Pagado</option>
          </select>
        </div>
        
        <table className="min-w-full border border-gray-900">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-2">Fecha</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Status</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-900">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-900">
                  <td className="p-2">
                    {new Date(appointment.date).toLocaleString()}
                  </td>
                  <td className="p-2">{appointment.description}</td>
                  <td className="p-2">{appointment.status}</td>
                  <td className="p-2">
                    <div className="flex justify-center space-x-4 mb-2">
                      <button
                        onClick={() => handleEdit(appointment)}
                        className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 w-1/2 text-center"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-400 w-1/2 text-center"
                      >
                        Eliminar
                      </button>
                    </div>
                    <div className="flex justify-center space-x-2">
                      {["Pendiente", "Procesado", "Pagado"].map((status) => (
                        <button
                          key={status}
                          onClick={() =>
                            handleStatusChange(
                              appointment.id,
                              status as IAppointmentData["status"]
                            )
                          }
                          className={`px-4 py-2 rounded ${
                            appointment.status === status
                              ? "bg-gray-700 text-white"
                              : "bg-gray-300 text-gray-800"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No hay citas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-4">
          <button
            onClick={onClose}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cerrar
          </button>
        </div>
      </div>
      {isModalOpen && editingAppointment && (
        <AppointmentModal
          appointment={editingAppointment}
          onSave={handleModalSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AppointmentModalAdmin;
