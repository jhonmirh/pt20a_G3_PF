"use client";

import React, { useEffect, useState } from "react";
import { getAppointments, updateAppointment } from "@/helpers/appointment.helper";
import { useLoggin } from "@/context/logginContext";
import EditAppointmentForm from "../EditAppointment/EditAppointmentForm";
import AppointmentProps from "@/interfaces/Appointment";
const ProcessedAppointments: React.FC = () => {
  const { userData } = useLoggin();
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingAppointment, setEditingAppointment] = useState<AppointmentProps | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (userData?.userData.id) {
          const data: AppointmentProps[] = await getAppointments(userData.userData.id); // Asegúrate de que data sea de tipo AppointmentProps[]
          
          
          const processedAppointments = data.filter((appointment: AppointmentProps) => appointment.status === "Procesado");
          setAppointments(processedAppointments);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userData]);

  const handleEditClick = (appointment: AppointmentProps) => {
    setEditingAppointment(appointment);
  };

  const handleSave = async (updatedAppointment: AppointmentProps) => {
    try {
      await updateAppointment(updatedAppointment.id, {
        description: updatedAppointment.description,
        date: updatedAppointment.date,
        status: updatedAppointment.status,
      });
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === updatedAppointment.id ? updatedAppointment : app
        )
      );
      setEditingAppointment(null);
    } catch (err) {
      console.error("Error updating appointment", err);
    }
  };

  if (loading) return <p>Cargando citas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-center">
        <div className="bg-white bg-opacity-80 p-2 max-w-md w-full rounded-lg shadow-lg text-center mb-2">
          <h1 className="text-gray-900 font-bold text-2xl">Tus Citas Procesadas</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white bg-opacity-80 border border-gray-900 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold mb-3">
              {appointment.description}
            </h2>
            <p className="text-gray-700 mb-2">
              Fecha: {new Date(appointment.date).toLocaleString()}
            </p>
            <div className="text-gray-700 mb-2">
              <p>
                <strong>Usuario:</strong> {appointment.user.name}
              </p>
              <p>
                <strong>Teléfono:</strong> {appointment.user.phone}
              </p>
              <p>
                <strong>Dirección:</strong> {appointment.user.address}, {appointment.user.city}
              </p>
            </div>
            <div className="text-gray-700">
              <p>
                <strong>Categoría:</strong> {appointment.category.name}
              </p>
            </div>
            <div className="text-gray-700">
              <p>
                <strong>Precio:</strong> {appointment.category.price}
              </p>
            </div>
            <div className="text-gray-700">
              <p>
                <strong>Estado de tu Cita:</strong> {appointment.status}
              </p>
            </div>
            <div className="mt-4 flex space-x-3">
             
             
            </div>
          </div>
        ))}
      </div>
      {editingAppointment && (
        <EditAppointmentForm
          appointment={editingAppointment}
          onSave={handleSave}
          onCancel={() => setEditingAppointment(null)}
        />
      )}
    </div>
  );
};

export default ProcessedAppointments;
