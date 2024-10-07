import React, { useState, useEffect } from "react";
import IProduct from "@/interfaces/Products";
import AlertModal from "../Alert/AlertModal";
import { useLoggin } from "@/context/logginContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Agg = ({ product }: { product: IProduct }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const { userData } = useLoggin();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const appointment = JSON.parse(localStorage.getItem("appointment") || "[]");
    const cleanedAppointment = appointment.filter((item: any) => item !== null);

    // Si hay elementos nulos en el array, actualiza el localStorage
    if (cleanedAppointment.length !== appointment.length) {
      localStorage.setItem("appointment", JSON.stringify(cleanedAppointment));
    }
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    // Evitar que el clic se propague al contenedor de la tarjeta
    event.stopPropagation();

    try {
      // Obtenemos los ids de los productos en las citas
      const appointmentIds: string[] = JSON.parse(localStorage.getItem("appointment") || "[]");
      localStorage.setItem("selectedProductId", product.id);
      // Verificamos si el id del producto ya está en las citas
      const isProductInAppointment = appointmentIds.includes(product.id);

      if (isProductInAppointment) {
        // Muestra un modal si el producto ya está en las citas
        setModalContent({
          title: "Revisa tus Citas",
          message: "El Servicio Tiene Citas Pendientes",
        });
        setShowModal(true);
      } else {
        // Agrega solo el id del producto a las citas
        appointmentIds.push(product.id);
        localStorage.setItem("appointment", JSON.stringify(appointmentIds));
        router.push("/appointment"); // Redirige al path /appointment
      }
    } catch (error) {
      console.error("Cart Error Warning", error);
      setModalContent({
        title: "Atención: Se presentó un error",
        message: "Ocurrió un error agregando la cita",
      });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/');
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition-colors"
      >
        Agregar Cita
      </button>
        <AlertModal
          show={showModal}
          onClose={handleCloseModal}
          title={modalContent.title}
          message={modalContent.message}
        />
    </>
  );
};

export default Agg;
