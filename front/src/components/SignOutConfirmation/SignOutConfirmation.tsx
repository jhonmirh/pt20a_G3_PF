import React from "react";
import { SigOutModalProps } from "./type";

const SignOutConfirmation: React.FC<SigOutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg shadow-green-950">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-700"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-gray-900 text-white px-4 py-2 rounded shadow-lg hover:bg-gray-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );

};

export default SignOutConfirmation;
