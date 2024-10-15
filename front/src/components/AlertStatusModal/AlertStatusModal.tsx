import React from "react";

interface AlertModalProps {
  title: string;
  message: string;
  showModal: boolean;
  handleClose: () => void;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

const AlertStatusModal: React.FC<AlertModalProps> = ({
  title,
  message,
  showModal,
  handleClose,
  onConfirm,
  onCancel,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-between">
          <button
            onClick={async () => {
              await onConfirm();
              handleClose(); 
            }}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Confirmar
          </button>
          <button
            onClick={() => {
              onCancel();
              handleClose();
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertStatusModal;
