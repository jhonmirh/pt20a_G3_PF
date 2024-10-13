"use client";
import { usePathname } from "next/navigation";
import React from "react";

const ShowComponent = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();


  const hiddenPaths = ["/login", "/register", "/appointment", "/appointments", "/dashboardAdmin/appointments", "/dashboardAdmin/users", "/dashboardAdmin/categories", "/dashboard/orders", "/dashboard/profiles"];

  if (hiddenPaths.includes(pathName)) {
    return null; 
  }

  return <div>{children}</div>;
};

export default ShowComponent;
