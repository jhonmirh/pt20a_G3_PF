"use client";
import { usePathname } from "next/navigation";
import React from "react";

const ShowComponent = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  // Define las rutas donde no deseas mostrar el contenido
  const hiddenPaths = ["/login", "/register", "/appointment"];

  // Si el pathname es igual a alguna de las rutas en hiddenPaths, devuelve null
  if (hiddenPaths.includes(pathName)) {
    return null; // No mostrar el navbar ni el sidebar
  }

  return <div>{children}</div>;
};

export default ShowComponent;
