// src/helpers/appointment.helper.ts
import { IAppointmentData } from "@/interfaces/Appointment";

const APIURL = process.env.NEXT_PUBLIC_API_URL

// helper.js o api.js
export const createAppointment = async (appointmentData:IAppointmentData) => {
    try {
      const response = await fetch("http://localhost:3010/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(appointmentData)
      });
  
      if (response.status === 201) {
        const result = await response.json();
        return result;  
      } else {
        throw new Error("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error creando la cita:", error);
      throw error;
    }
  };
  

export const updateAppointment = async (id: string, appointmentData: IAppointmentData) => {
    const res = await fetch(`${APIURL}/appointments/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
    });
    if (!res.ok) {
        throw new Error("Error al actualizar la cita");
    }
    return await res.json();
};

export const getUserAppointments = async (userId: string) => {
    const res = await fetch(`/api/appointments/user/${userId}`);
    if (!res.ok) {
        throw new Error("Error al obtener las citas del usuario");
    }
    return await res.json();
};

export const cancelAppointment = async (appointmentId: string) => {
    const res = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error("Error al cancelar la cita");
    }
};

export const getAllAppointments = async () => {
    const res = await fetch('/api/appointments');
    if (!res.ok) {
        throw new Error("Error al obtener todas las citas");
    }
    return await res.json();
};

export const deleteAppointments = async (appointmentIds: string[]) => {
    const res = await fetch('/api/appointments/delete-many', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: appointmentIds }),
    });
    if (!res.ok) {
        throw new Error("Error al eliminar múltiples citas");
    }
};
