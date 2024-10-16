"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAppointments, updateAppointment } from "@/helpers/appointment.helper";
import { IAppointmentData } from "@/interfaces/Appointment";
import Modal from "@/components/Pagado/Pagado";
import { useLoggin } from "@/context/logginContext";

interface IUpdateAppointment {
  description: string;
  date: string;
  status?: "Pendiente" | "Procesado" | "Pagado"; 
}

const Success: React.FC = () => {
  const { userData } = useLoggin();
  const [appointment, setAppointment] = useState<IAppointmentData | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const router = useRouter();

  const appointmentId = typeof window !== 'undefined' ? localStorage.getItem("activeAppointmentId") : null;

  useEffect(() => {
    const fetchAppointment = async () => {
      if (appointmentId && userData?.userData?.id) { 
        try {
          const userId = userData.userData.id; 
          const data = await getAppointments(userId); 
          const activeAppointment = data.find((app: IAppointmentData) => app.id === appointmentId);
  
          if (activeAppointment) {
            setAppointment(activeAppointment);
            await updateAppointment(activeAppointment.id, {
              description: activeAppointment.description,
              date: activeAppointment.date,
              status: "Pagado" 
            });
            setModalVisible(true);
            localStorage.removeItem("activeAppointmentId");
          }
        } catch (err) {
          console.error("Error fetching or updating appointment", err);
        }
      }
    };
  
    fetchAppointment();
  }, [appointmentId, userData?.userData?.id]);

  const handleCloseModal = () => {
    setModalVisible(false);
    router.push("/appointments");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {modalVisible && (
        <Modal title="Pago Exitoso" onClose={handleCloseModal}>
          <p>Tu pago ha sido realizado correctamente.</p>
          <button
            onClick={handleCloseModal}
            className="bg-gray-900 text-white w-full px-4 py-2 rounded hover:bg-gray-700 transition-all mt-4" // Cambiado 'w-full' para que el botón ocupe todo el ancho
          >
            Cerrar
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Success;
