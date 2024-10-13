'use client'
import { IUsersUpdate } from "@/interfaces/LoginRegister";

interface ConfirmationModalProps {
    user: IUsersUpdate;
    onClose: () => void;
    onConfirm: () => void;
  }
  
  const ConfirmationModal = ({ user, onClose, onConfirm }: ConfirmationModalProps) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Confirmar eliminación</h2>
          <p className="text-gray-700 mb-4">
            ¿Estás seguro de que deseas eliminar al usuario {user.name}?
          </p>
          <div className="flex justify-between">
            <button
              onClick={onConfirm}
              className="p-2 bg-gray-900 text-white rounded hover:bg-gray-700"
            >
              Sí, eliminar
            </button>
            <button
              onClick={onClose}
              className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };
  

  export default ConfirmationModal;