"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { userSession } from "@/interfaces/LoginRegister";
import IProduct from "@/interfaces/Products";

// Definición de la estructura del contexto
export interface LogginContextProps {
  userData: userSession | null;
  setUserData: (userData: userSession | null) => void;
  selectedProduct: IProduct | null;
  setSelectedProduct: (product: IProduct | null) => void;
}

// Creación del contexto con valores iniciales vacíos
export const LogginContext = createContext<LogginContextProps>({
  userData: null,
  setUserData: () => {},
  selectedProduct: null,
  setSelectedProduct: () => {},
});

export interface LogginProviderProps {
  children: React.ReactNode;
}


export const LogginProvider: React.FC<LogginProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<userSession | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);


  useEffect(() => {
    if (userData) {
      localStorage.setItem(
        "sessionStart",
        JSON.stringify({ token: userData.token, userData: userData.userData })
      );
    }
  }, [userData]);


  useEffect(() => {
    const storedUserData = localStorage.getItem("sessionStart");
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData); 
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
