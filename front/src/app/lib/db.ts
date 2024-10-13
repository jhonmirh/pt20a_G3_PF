export const updateAppointmentStatus = async (id: string, status: string) => {
    const response = await fetch(`http://localhost:3010/appointments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }), // Solo necesitas enviar el nuevo estado
    });
  
    if (!response.ok) {
      throw new Error(`Error actualizando el estado de la cita: ${response.statusText}`);
    }
  
    return await response.json();
  };