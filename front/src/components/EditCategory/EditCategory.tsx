"use client";

import { useState } from "react";
import { IUsersUpdate } from "@/interfaces/LoginRegister";
import ICategory from "@/interfaces/Category";


interface EditCategoryFormProps {
  categories: ICategory;
  onSave: (updatedCategory: ICategory) => void;
  onCancel: () => void;
}

const EditCategory: React.FC<EditCategoryFormProps> = ({
  categories,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(categories.name);
  const [price, setPrice] = useState(categories.price);
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCategory = { ...categories, name, price };
    onSave(updatedCategory);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edición de Servicios
        </h1>
        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Correo Electrónico</label>
              <input
                type="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="flex space-x-2 justify-end mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
