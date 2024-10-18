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
  const [name, setName] = useState<string>(users.name);
  const [email, setEmail] = useState<string>(users.email);
  const [phone, setPhone] = useState<number>(users.phone);
  const [address, setAddress] = useState<string>(users.address);
  const [city, setCity] = useState<string>(users.city);
  const [age, setAge] = useState<number>(users.age);
  const [password, setPassword] = useState<string>(users.password);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validación de los campos
  const validateFields = () => {
    const errors: { [key: string]: string } = {};

    if (!name) errors.name = "El nombre es requerido.";
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Correo electrónico inválido.";
    }
    if (!phone || !/^\d{10}$/.test(phone.toString())) {
      errors.phone = "El teléfono debe tener 10 dígitos.";
    }
    
    if (!address) errors.address = "La dirección es requerida.";
    if (!city) errors.city = "La ciudad es requerida.";
    if (!age || age <= 0) errors.age = "Edad inválida.";
    if (
      password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)
    ) {
      errors.password =
        "Contraseña insegura. Debe contener mínimo 8 caracteres, una mayúscula, un número y un símbolo.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejador del envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      const updatedUser = {
        ...users,
        name,
        email,
        phone,
        address,
        city,
        age,
        password,
      };
      onSave(updatedUser);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edición de Usuario
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
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Teléfono</label>
              <input
  type="number"
  value={phone.toString()}  // Convertimos a string para el input
  onChange={(e) => setPhone(parseInt(e.target.value, 10) || 0)}  // Convertimos de vuelta a number
  className="w-full p-2 border border-gray-300 rounded"
  required
/>
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
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
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
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
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
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
              {errors.age && (
                <p className="text-red-500 text-sm">{errors.age}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
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

export default EditUserForm;
