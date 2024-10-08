
import { IAppointmentData } from "@/interfaces/Appointment";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function createAppointment(data: { date: string; description: string; user: string; categoryId: string }) {
    console.log(data)
    try {
        const response = await fetch('http://localhost:3010/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message; 
            throw new Error(`Failed to create appointment: ${errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creando la cita:", error);
        throw error; 
    }
}


  
  

export const updateAppointment = async (id: string, data: { description: string, date: string }) => {
    const response = await fetch(`${APIURL}/appointments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error(`Error actualizando la cita: ${response.statusText}`);
    }
  
    return await response.json();
  };
  

export const getUserAppointments = async (userId: string) => {
    const res = await fetch(`${APIURL}/appointments/${userId}/appointments`);
    if (!res.ok) {
        throw new Error("Error al obtener las citas del usuario");
    }
    return await res.json();
};

export const cancelAppointment = async (appointmentId: string) => {
    const res = await fetch(`${APIURL}/appointments/${appointmentId}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error("Error al cancelar la cita");
    }
};

export const getAllAppointments = async () => {
    const res = await fetch(`${APIURL}/appointments`);
    if (!res.ok) {
        throw new Error("Error al obtener todas las citas");
    }
    return await res.json();
};

export const deleteAppointments = async (appointmentIds: string[]) => {
    const res = await fetch(`${APIURL}/appointments/delete-many`, {
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


//////////////////////// ME MATO ESTO 


export async function getAppointments(userId:string) {
    const response = await fetch(`${APIURL}/appointments/${userId}/appointments`);
    if (!response.ok) {
      throw new Error('Error fetching appointments');
    }
    return await response.json();
  }
  