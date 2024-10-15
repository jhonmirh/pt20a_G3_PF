import React from "react";

interface AlertModalProps {
  showModal: boolean;
  handleClose: () => void;
  title: string;
  message: string;
  children?: React.ReactNode; // Agrega esta línea
}

const AlertStatus: React.FC<AlertModalProps> = ({ showModal, handleClose, title, message, children }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-lg text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          {children} {/* Renderiza los children aquí */}
        </div>
      </div>
    </div>
  );
};

export default AlertStatus;








