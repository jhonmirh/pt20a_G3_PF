'use client'
import { useState } from "react";
import { useLoggin } from "@/context/logginContext";
import { useRouter } from "next/navigation";
import { createAppointment, updateAppointment, cancelAppointment } from "@/helpers/appointment.helper";
import { IAppointmentData } from "@/interfaces/Appointment";

interface AppointmentFormProps {
  appointmentId?: string; // Para editar
  initialData?: IAppointmentData; // Datos iniciales
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ appointmentId, initialData }) => {
  const { userData } = useLoggin();
  const router = useRouter();
  const [formData, setFormData] = useState<IAppointmentData>({
    id: appointmentId || "",
    date: initialData?.date || "",
    description: initialData?.description || "",
    userId: userData?.userData?.id || "", // Obtiene el ID del usuario actual
    product: {
      id: initialData?.product?.id || '',
      categoryId: initialData?.product?.categoryId || '',
      description: initialData?.product?.description || '',
      image: initialData?.product?.image || '',
      name: initialData?.product?.name || '',
      price: initialData?.product?.price || '',
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // Seguimiento del estado de envío
  const [error, setError] = useState<string | null>(null); // Para rastrear mensajes de error

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!formData.date || !formData.description) {
      alert("Complete todos los campos");
      return;
    }
  
    // Definir el tipo para los productos
    interface Product {
      id: string;
    }
  
    // Recuperar productos desde localStorage
    const storedProducts = localStorage.getItem('products');
  
    // Verificar que existan productos y extraer solo los IDs con tipado explícito
    const products: string[] = storedProducts ? (JSON.parse(storedProducts) as Product[]).map((product: Product) => product.id) : [];
  
    // Definir la data para la cita, incluyendo solo los IDs de los productos
    const appointmentData = {
      date: new Date(formData.date).toISOString(), // Normaliza la fecha
      description: formData.description,
      user: userData?.userData?.id,  // Solo el ID del usuario
      products: products  // Enviamos solo los IDs de los productos
    };
  
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
        console.log("Cita creada exitosamente:", result);
        // Aquí podrías redirigir o actualizar el estado de la aplicación con los datos de la cita
      }
    } catch (error) {
      console.error("Error creando la cita:", error);
    }
  };
  

  const handleDelete = async () => {
    if (!appointmentId) return;

    try {
      await cancelAppointment(appointmentId);
      setFormData({
        id: "",
        date: "",
        description: "",
        userId: userData?.userData?.id || "",
        product: {
          id: '',
          categoryId: '',
          description: '',
          image: '',
          name: '',
          price: '',
        },
      });
      setIsSubmitted(false);
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
      setError("Error al eliminar la cita");
    }
  };

  return (
    <div className="bg-white bg-opacity-85 p-6 rounded-lg shadow-lg mb-2">
      {isSubmitted ? (
        <div>
          <h2 className="text-gray-900 text-2xl text-center mb-4">
            {appointmentId ? "Cita Actualizada" : "Cita Creada"}
          </h2>
          <p className="text-gray-900">Fecha y Hora: {formData.date}</p>
          <p className="text-gray-900">Descripción: {formData.description}</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-gray-900 text-white rounded-md py-2 px-4 hover:bg-gray-700 transition duration-300"
            >
              Modificar Cita
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white rounded-md py-2 px-4 hover:bg-red-500 transition duration-300"
            >
              Borrar Cita
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-gray-900 text-2xl text-center mb-8">{appointmentId ? "Editar Cita" : "Crear Cita"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-900">Fecha y Hora:</label>
              <input
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-gray-900">Descripción:</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white rounded-md py-2 hover:bg-gray-700 transition duration-300"
            >
              {appointmentId ? "Actualizar Cita" : "Crear Cita"}
            </button>
          </form>
        </div>
      )}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </div>
  );
};
