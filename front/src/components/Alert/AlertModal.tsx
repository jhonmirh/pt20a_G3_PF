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
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default AlertModal;
