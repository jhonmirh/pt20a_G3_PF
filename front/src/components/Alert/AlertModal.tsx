import React from "react";

interface AlertModalProps {
  showModal: boolean;
  handleClose: () => void;
  title: string;
  message: string;
}

const AlertModal: React.FC<AlertModalProps> = ({ showModal, handleClose, title, message }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="text-4xl mb-4 text-red-600">
          🚨
        </div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {message}
        </p>
        <button 
          className="bg-gray-900 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg w-full max-w-xs mx-auto"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
