"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { userSession } from "@/interfaces/LoginRegister";
import IProduct from "@/interfaces/Products";

// Definición de la estructura del contexto
export interface LogginContextProps {
  userData: userSession | null;
  setUserData: (userData: userSession | null) => void;
  loginWithGoogle: (googleUserData: { credential: string }) => Promise<{ user: any, token: string }>
  selectedProduct: IProduct | null;
  setSelectedProduct: (product: IProduct | null) => void;
}

// Creación del contexto con valores iniciales vacíos
export const LogginContext = createContext<LogginContextProps>({
  userData: null,
  setUserData: () => {},
  loginWithGoogle: async () => {
    return { user: {}, token: "" };
  },
  selectedProduct: null,
  setSelectedProduct: () => {},
});

export interface LogginProviderProps {
  children: React.ReactNode;
}

// Proveedor de contexto
export const LogginProvider: React.FC<LogginProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<userSession | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

// Función de inicio de sesión con Google
const loginWithGoogle = async (googleUserData: { credential: string }) : Promise<{ user: any, token: string }>=> {
  try {
    const response = await fetch(`http://localhost:3010/auth/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: googleUserData.credential }),
      
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const userData = await response.json();
    console.log("Response data:", userData);
    const newUser = {
      token: userData.token,
      user: {
        name: userData.userData.name || "Sin datos", // O asigna un valor predeterminado si falta
        email: userData.userData.email || "Sin datos",
        phone: userData.userData.phone || "Sin datos",
      },
    };
    console.log("Formatted User Data:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    throw error; // Lanza el error para que se maneje en handleGoogleLoginSuccess
  }
};

  // Efecto para almacenar datos de usuario en localStorage cuando cambian
  useEffect(() => {
    if (userData) {
      localStorage.setItem(
        "sessionStart",
        JSON.stringify({ token: userData.token, userData: userData.userData })
      );
    }
  }, [userData]);

  // Efecto para cargar datos del localStorage cuando el componente se monta
  useEffect(() => {
    const storedUserData = localStorage.getItem("sessionStart");
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error("Error parsing session data:", error);
        setUserData(null);
      }
    }
  }, []);

  return (
    <LogginContext.Provider
      value={{
        userData,
        setUserData,
        loginWithGoogle,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </LogginContext.Provider>
  );
};

// Hook personalizado para usar el contexto en los componentes
export const useLoggin = () => useContext(LogginContext);
