'use client'

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const ShowComponent = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (<div>
    {
      pathName !== '/login' && (
        children
      )
    }
  </div>);
};

export default ShowComponent;
