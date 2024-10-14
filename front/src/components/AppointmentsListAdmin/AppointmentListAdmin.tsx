"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useLoggin } from "@/context/logginContext";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import { UserProps } from "@/interfaces/Appointment";
import { IAppointmentData } from "@/interfaces/Appointment";

interface IAppointment {
  id: string;
  date: string;
  description: string;
  price: number;
  user: UserProps;
  categoryId: string;
  status: "Pendiente" | "Procesado" | "Pagado";
}

const AppointmentList = () => {
  const { userData } = useLoggin();
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<IAppointment[]>([]);
  const [editingAppointment, setEditingAppointment] = useState<IAppointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState(""); // Nuevo estado para el filtro de estado

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
          headers: { Authorization: `Bearer ${userData?.token || ""}` },
        });

        if (!response.ok) throw new Error("Error al obtener las citas");

        const data = await response.json();
        setAppointments(data);
        setFilteredAppointments(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAppointments();
  }, [userData]);

  useEffect(() => {
    const filtered = appointments.filter((appointment) => 
      appointment.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!searchDate || appointment.date.startsWith(searchDate)) &&
      (!searchStatus || appointment.status === searchStatus) // Filtro por estado
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, searchDate, searchStatus, appointments]);

  const handleEdit = (appointment: IAppointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
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

  const handleStatusChange = async (id: string, status: IAppointmentData["status"]) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userData?.token || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) {
        throw new Error(`Error al actualizar estado: ${response.statusText}`);
      }
  
      const updatedAppointment = await response.json();
      setAppointments((prev) =>
        prev.map((app) => (app.id === updatedAppointment.id ? updatedAppointment : app))
      );
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      alert("No se pudo guardar el estado. Por favor, inténtalo de nuevo.");
    }
  };
  
  const handleModalSave = async (updatedAppointment: IAppointment) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${updatedAppointment.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userData?.token || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAppointment),
      });

      const data = await response.json();
      setAppointments((prev) =>
        prev.map((app) => (app.id === data.id ? data : app))
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por descripción"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-900 rounded mb-2"
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchDate(e.target.value)}
          className="w-full p-2 border border-gray-900 rounded mb-2"
        />
        <select
          value={searchStatus}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSearchStatus(e.target.value)}
          className="w-full p-2 border border-gray-900 rounded"
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
            <th className="p-2">Estado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-900">
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id} className="border-b border-gray-900">
              <td className="p-2">
                {new Date(appointment.date).toLocaleString()}
              </td>
              <td className="p-2">{appointment.description}</td>
              <td className="p-2">{appointment.status}</td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(appointment)}
                    className="bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
                  >
                    Eliminar
                  </button>
                  <div className="flex space-x-2">
                    {["Pendiente", "Procesado", "Pagado"].map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          handleStatusChange(
                            appointment.id,
                            status as IAppointmentData["status"]
                          )
                        }
                        className={`px-2 py-1 rounded ${
                          appointment.status === status
                            ? "bg-gray-400"
                            : "bg-gray-300"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && editingAppointment && (
        <AppointmentModal
          appointment={editingAppointment} // Pasa un objeto, no un array
          onSave={handleModalSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AppointmentList;
