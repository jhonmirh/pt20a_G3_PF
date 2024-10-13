"use client";
import React, { useState } from "react";
import { AlertModalProps } from "./types";


const AlertModalLogin: React.FC<AlertModalProps> = ({
  show,
  onClose,
  title,
  message,
}) => {


  if (!show) return null;

  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-[0_4px_6px_rgba(0,0,0,0.3),0_2px_4px_rgba(59,197,59,0.9)]">
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
              ⚠️ {title}
            </h2>
            <p className="text-lg text-gray-800 mb-6 text-center">{message}</p>
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-lime-500 hover:bg-green-950 text-white rounded-md transition-colors duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
    </>
  );
};

export default AlertModalLogin;
