"use client";

import { useState } from "react";
import { IUsersUpdate } from "@/interfaces/LoginRegister";

interface EditUsersFormProps {
  users: IUsersUpdate;
  onSave: (updatedUsers: IUsersUpdate) => void;
  onCancel: () => void;
}

const EditUserForm: React.FC<EditUsersFormProps> = ({
  users,
  onSave,
  onCancel,
}) => {
  const [password, setPassword] = useState(users.password);
  const [address, setAddress] = useState(users.address);
  const [city, setCity] = useState(users.city);
  const [phone, setPhone] = useState(users.phone);
  const [name, setName] = useState(users.name);
  const [email, setEmail] = useState(users.email);
  const [age, setAge] = useState(users.age);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUsers = { ...users, address, city, phone, name, email, age, password };
    onSave(updatedUsers);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edición de Usuario
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Contenedor de dos columnas */}
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Teléfono</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Dirección</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Ciudad</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Edad</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Botones */}
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

export default EditUserForm;
