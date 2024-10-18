'use client';
import CompleteProfile from "@/components/CompleteProfile/CompleteProfile";
import React, { useEffect, useState } from "react";
import { useLoggin } from "@/context/logginContext";
import { useRouter } from "next/navigation"; 

const Completar = () => {
  const { userData } = useLoggin();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Verificar si userData está disponible y si el usuario ha iniciado sesión con Google
    const isGoogleLogin = userData && userData.userData && userData.userData.email;

    if (!isGoogleLogin) {
      router.push("/login"); 
    } else {
      setLoading(false); // Actualiza el estado de carga cuando el usuario está autenticado
    }
  }, [userData, router]); // Dependencias del efecto

  // Mostrar un mensaje de carga mientras se verifica el estado
  if (loading) {
    return <p>Cargando...</p>; // O un spinner de carga
  }

  return (
    <div>
      <CompleteProfile />
    </div>
  );
};

export default Completar;
