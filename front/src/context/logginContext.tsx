"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { userSession } from "@/interfaces/LoginRegister";

export interface LogginContextProps {
  userData: userSession | null;
  setUserData: (userData: userSession | null) => void;
}

export const LogginContext = createContext<LogginContextProps>({
  userData: null,
  setUserData: () => {},
});

export interface LogginProviderProps {
  children: React.ReactNode;
}

export const LogginProvider: React.FC<LogginProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<userSession | null>(null);

  useEffect(() => {
    if (userData) {
      localStorage.setItem(
        "sessionStart",
        JSON.stringify({ token: userData.token, userData: userData.userData })
      );
    }
  }, [userData]);

  useEffect(() => {
    const userData = localStorage.getItem("sessionStart");
    if (userData) {
      try {
        setUserData(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing session data:", error);
        setUserData(null);
      }
    }
  }, []);
  return (
    <LogginContext.Provider value={{ userData, setUserData }}>
      {children}
    </LogginContext.Provider>
  );
};

export const useLoggin = () => useContext(LogginContext);