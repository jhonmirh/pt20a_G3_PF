const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Función para obtener todos los usuarios
export const getUsers = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Incluir el token en los headers
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getUsers:', error);
    throw error;
  }
};



export const updateUserData = async (id: string, updatedData: {
  name: string,
  email: string,
  age: number,
  phone: number,
  address: string,
  city: string,
  password: string
}, token?: string): Promise<any> => {
  try {
    console.log("Datos enviados para actualización:", updatedData);

    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Detalles del error:', errorData);
      throw new Error('Error al actualizar el usuario');
    }

    return await response.json(); // Devolver respuesta exitosa
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

