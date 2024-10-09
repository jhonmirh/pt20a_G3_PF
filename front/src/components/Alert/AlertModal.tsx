// AlertModal.tsx
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10">
                <h2 className="text-lg font-bold">{title}</h2>
                <p>{message}</p>
                <button onClick={handleClose} className="mt-4 bg-blue-500 text-white rounded px-4 py-2">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default AlertModal;
