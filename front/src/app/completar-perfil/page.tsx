'use client'
import CompleteProfile from "@/components/CompleteProfile/CompleteProfile";
import React from "react";
import { useLoggin } from "@/context/logginContext";
import { useRouter } from "next/navigation"; 

const Completar = () => {
  const { userData } = useLoggin();
  const router = useRouter();

  const isGoogleLogin = userData && userData.userData && userData.userData.email; 

  if (!isGoogleLogin) {
    router.push("/login"); 
    return null; 
  }

  return (
    <div>
      <CompleteProfile />
    </div>
  );
};

export default Completar;
