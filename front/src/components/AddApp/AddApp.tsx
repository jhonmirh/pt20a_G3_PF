import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { userSession } from "@/interfaces/LoginRegister";
import IProduct from "@/interfaces/Products";
import AlertModal from "../Alert/AlertModal";

const AddAppointment = ({ product }: { product: IProduct }) => {
  const [showNavigation, setShowNavigation] = useState<userSession | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const sessionUser = localStorage.getItem("sessionStart");
    if (sessionUser) {
      setShowNavigation(JSON.parse(sessionUser));
    }

    const appointment = JSON.parse(localStorage.getItem("appointment") || "[]");
    const cleanedAppointment = appointment.filter((item: any) => item !== null);
    if (cleanedAppointment.length !== appointment.length) {
      localStorage.setItem("appointment", JSON.stringify(cleanedAppointment));
    }
  }, []);

  const handleClick = () => {
    if (!showNavigation?.token) {
      setModalContent({
        title: "Error de Sesión",
        message: "Por favor, inicia sesión para agregar una cita.",
      });
      setShowModal(true);
      return;
    }

    try {
      const appointment: IProduct[] = JSON.parse(localStorage.getItem("appointment") || "[]");
      const isProductInApp = appointment.some((p) => p.id === product.id);

      if (isProductInApp) {
        setModalContent({
          title: "Verifica tus Citas",
          message: "El producto ya está en la lista de citas.",
        });
        setShowModal(true);
      } else {
        appointment.push(product);
        localStorage.setItem("appointment", JSON.stringify(appointment));
        setModalContent({
          title: "Agregado Satisfactoriamente",
          message: "Producto agregado a tus citas con éxito.",
        });
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error al agregar a la cita", error);
      setModalContent({
        title: "Advertencia de Cita",
        message: "Hubo un error al agregar el producto a la cita.",
      });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/appointment"); 
  };

  return (
    <>
      {showNavigation?.token && pathname !== "/appointment" && pathname !== "/dashboard/orders" && (
        <div 
          onClick={handleClick} 
          title="Add Appointment" 
          className="flex items-center space-x-1 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-800 hover:text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 3h10M5 3h2v2H5V3zm12 0h2v2h-2V3zM7 7h10M5 7h2v2H5V7zm12 0h2v2h-2V7zM5 11h14v10H5V11z"
            />
          </svg>
          <span className="text-green-800 hover:text-green-600">Add</span>

          <AlertModal
            show={showModal}
            onClose={handleCloseModal}
            title={modalContent.title}
            message={modalContent.message}
          />
        </div>
      )}
    </>
  );
};

export default AddAppointment;
