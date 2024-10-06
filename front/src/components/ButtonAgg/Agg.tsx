// import React, { useState, useEffect} from "react";
// import IProduct from "@/interfaces/Products";
// import AlertModal from "../Alert/AlertModal";
// import { useLoggin } from "@/context/logginContext";
// import { useRouter } from "next/navigation"; // Importa useRouter

// const Agg = ({ product }: { product: IProduct }) => {
//   const { userData, setSelectedProduct } = useLoggin();

//   const [showModalCita, setShowModalCita] = useState(false);
//   const [showModalError, setShowModalError] = useState(false);
//   const [showModalRevisa, setShowModalRevisa] = useState(false);
//   const [modalContent, setModalContent] = useState({ title: "", message: "" });


//   const router = useRouter(); // Inicializa el hook useRouter

//   useEffect(() => {
//     const appointment = JSON.parse(localStorage.getItem("appointment") || "[]");
//     const cleanedAppointment = appointment.filter((item: any) => item !== null);
//     if (cleanedAppointment.length !== appointment.length) {
//       localStorage.setItem("appointment", JSON.stringify(cleanedAppointment));
//     }
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       setShowModalCita(false);
//       setShowModalError(false);
//       setShowModalRevisa(false);
//     }
//   }, [userData]);

//   const handleClick = () => {
//     if (userData) {
//       console.log("handleClick called");
//       try {
//         const appointment: IProduct[] = JSON.parse(localStorage.getItem("appointment") || "[]");
//         console.log("appointment array:", appointment);
//         console.log("product id:", product.id);
//         const isProductInAppointment = appointment.some((p) => p.id === product.id);
//         console.log("isProductInAppointment:", isProductInAppointment);
//         if (isProductInAppointment) {
//           setModalContent({
//             title: "Revisa Tus Citas",
//             message: "Ya Tienes Cita Activa",
//           });
//           setShowModalRevisa(true);
//         } else {
//           setSelectedProduct(product); // Guardar producto seleccionado
//           appointment.push(product);
//           localStorage.setItem("appointment", JSON.stringify(appointment));
//           setModalContent({
//             title: "Agenda Tu Cita",
//             message: "Elija su Día y Hora que pronto te Atenderemos",
//           });
//           setShowModalCita(true);
//         }
//       } catch (error) {
//         console.error("Error en las Citas", error);
//         setModalContent({
//           title: "Error en las Citas",
//           message: "Existió un Error al Traer los Servicios",
//         });
//         setShowModalError(true);
//       }
//     } else {
//       console.log("No hay sesión iniciada");
//     }
//   };

//   // Manejadores de cierre de modales
//   const handleCloseModalCita = () => {
//     setShowModalCita(false);
//     setTimeout(() => {
//       router.push("/appointment"); // Usa router.push para redirigir
//     }, 500); // Espera 500ms antes de redirigir
//   };

//   const handleCloseModalError = () => {
//     setShowModalError(false);
//     setTimeout(() => {
//       router.push("/"); // Usa router.push para redirigir
//     }, 500);
//   };

//   const handleCloseModalRevisa = () => {
//     setShowModalRevisa(false);
//     setTimeout(() => {
//       router.push("/"); // Usa router.push para redirigir
//     }, 500);
//   };

//   return (
//     <>
//       <button
//         onClick={handleClick}
//         className="mt-2 px-4 py-1 font-bold text-white bg-gray-700 rounded-lg hover:bg-gray-900 transition-colors duration-300"
//       >
//         Agregar Cita
//       </button>

//       {/* Renderización condicional de los modales */}
//       {showModalCita && (
//         <AlertModal
//           show={showModalCita}
//           onClose={handleCloseModalCita}
//           title={modalContent.title}
//           message={modalContent.message}
//         />
//       )}
//       {showModalError && (
//         <AlertModal
//           show={showModalError}
//           onClose={handleCloseModalError}
//           title={modalContent.title}
//           message={modalContent.message}
//         />
//       )}
//       {showModalRevisa && (
//         <AlertModal
//           show={showModalRevisa}
//           onClose={handleCloseModalRevisa}
//           title={modalContent.title}
//           message={modalContent.message}
//         />
//       )}
//     </>
//   );
// };

// export default Agg;
'use client'
import React, { useState, useEffect } from "react";
import IProduct from "@/interfaces/Products";
import { useLoggin } from "@/context/logginContext";
import { useRouter } from "next/navigation"; // Importa useRouter

const Agg = ({ product }: { product: IProduct }) => {
  const { userData, setSelectedProduct } = useLoggin();
  const router = useRouter(); // Inicializa el hook useRouter

  useEffect(() => {
    const appointment = JSON.parse(localStorage.getItem("appointment") || "[]");
    const cleanedAppointment = appointment.filter((item: any) => item !== null);
    if (cleanedAppointment.length !== appointment.length) {
      localStorage.setItem("appointment", JSON.stringify(cleanedAppointment));
    }
  }, []);

  const handleClick = () => {
    console.log("handleClick called");
    try {
      const appointment: IProduct[] = JSON.parse(localStorage.getItem("appointment") || "[]");
      console.log("appointment array:", appointment);
      console.log("product id:", product.id);
      const isProductInAppointment = appointment.some((p) => p.id === product.id);
      console.log("isProductInAppointment:", isProductInAppointment);
      if (isProductInAppointment) {
        alert("Ya tienes una cita activa");
      } else {
        setSelectedProduct(product); // Guardar producto seleccionado
        appointment.push(product);
        localStorage.setItem("appointment", JSON.stringify(appointment));
        alert("Cita agendada con éxito");
        router.push("/appointment"); // Usa router.push para redirigir
      }
    } catch (error) {
      console.error("Error en las Citas", error);
      alert("Error al agendar la cita");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="mt-2 px-4 py-1 font-bold text-white bg-gray-700 rounded-lg hover:bg-gray-900 transition-colors duration-300"
      >
        Agregar Cita
      </button>
    </>
  );
};

export default Agg;