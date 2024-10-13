import ICategory from "@/interfaces/Category";


export const deleteCategory = async (id: string, token?: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json(); // Obtener el mensaje de error del servidor
      throw new Error(errorData.message || "Error al eliminar la categoría");
    }
    
    // Puedes agregar lógica adicional aquí, como mostrar una notificación
  };
  

  
  export const updateCategory = async (id: string, data: {name:string, price:number}, token: string | undefined) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
      
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Asegúrate de incluir el token si es necesario
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Error al actualizar la categoría");
    }
  
    // Aquí asumiendo que la respuesta contiene la categoría actualizada
    const updatedCategory: ICategory = await response.json(); // Parsear la respuesta JSON
   console.log('====================================');
   console.log(response.json);
   console.log('====================================');
    return updatedCategory; // Devolver la categoría actualizada
  };
  

  
  export const getCategory = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      throw new Error("Error al obtener la categoría");
    }
  
    const categoryData = await response.json();
    return categoryData; // Devuelve los datos de la categoría
  };
  