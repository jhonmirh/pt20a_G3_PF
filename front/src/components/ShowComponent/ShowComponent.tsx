// ShowComponent.tsx
"use client";
import { usePathname } from "next/navigation";
import React from "react";

const ShowComponent = ({ children }: { children: React.ReactNode }) => {
  // const pathName = usePathname();

  // if (pathName === "/login") {
  //   return null; // Si la ruta es '/login', no mostramos nada
  // }

  return <div>{children}</div>;
};

export default ShowComponent;
