'use client'
import { ILogin, ILoginError, IRegister, TRegisterError } from "@/interfaces/LoginRegister";
import { registerUser } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AlertModal from "../Alert/AlertModal";

// Validation functions
export function validatePassword(password: string): string | undefined {
    if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        return "El password debe contener al menos un carácter especial, un número, una letra mayúscula y una letra minúscula y tener al menos ocho caracteres.";
    }
    return undefined; 
}

export function validateLogin(values: ILogin): ILoginError {
    const errors: ILoginError = {};
    if (!values.email) {
        errors.email = "Email es Requerido.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
        errors.email = "Invalid email address.";
    }
    return errors;
}

export function validateRegisterLogin(values: IRegister): TRegisterError {
    const errors: TRegisterError = {};
    
    if (!values.email) {
        errors.email = "Email es Requerido.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
        errors.email = "Invalid email address.";
    }

    if (!values.password) {
        errors.password = "Password es Requerido.";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(values.password)) {
        errors.password = "La contraseña debe contener al menos un carácter especial, un número, una letra mayúscula y una letra minúscula y tener al menos ocho caracteres.";
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = "Password es Requerido.";
    } else if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = "Password no Coinciden.";
    }

    if (!values.name) {
        errors.name = "Nombre es Requerido.";
    } else if (!/^[a-zA-Z\s]{3,30}$/.test(values.name)) {
        errors.name = "El nombre debe contener entre 3 y 30 caracteres.";
    }

    if (values.phone === undefined) {
        errors.phone = "Número Telefónico es Requerido.";
    } else if (typeof values.phone !== 'number' || !/^\d{10}$/.test(values.phone.toString())) {
        errors.phone = "El número de teléfono debe ser numérico y tener 10 dígitos.";
    }

    if (values.age === undefined || values.age === null) {
        errors.age = "Edad es Requerido.";
    } else if (typeof values.age !== 'number' || values.age < 18 || values.age > 99 || !/^\d{2}$/.test(values.age.toString())) {
        errors.age = "La edad debe ser un número de dos dígitos mayor o igual a 18";
    }

    if (!values.city) {
        errors.city = "Ciuda es Requerido.";
    } else if (!/^[a-zA-Z]{3,30}$/.test(values.city)) {
        errors.city = "La ciudad debe contener sólo letras y tener entre 3 y 30 caracteres.";
    }

    if (!values.address) {
        errors.address = "Dirección es Requerido.";
    } else if (!/^[a-zA-Z0-9\s\.,_-áéíóúÁÉÍÓÚñÑ]{3,30}$/.test(values.address)) {
        errors.address = "La dirección debe contener entre 3 y 30 caracteres";
    }

    return errors;
}


const Register = () => {
  const startState: IRegister = {
    name: "",
    email: "",
    age: 0,
    password: "",
    passwordConfirm: "",
    phone: 0,
    address: "",
    city: "",
    admin: false,
  };

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [dataUser, setData] = useState<IRegister>(startState);
  const [error, setError] = useState<TRegisterError>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = name === "age" || name === "phone" ? (value ? Number(value) : "") : value;

    setData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    // Update the errors based on current input
    const updatedErrors = validateRegisterLogin({
      ...dataUser,
      [name]: newValue,
    });


    if (name === "passwordConfirm") {
      if (newValue !== dataUser.password) {
        updatedErrors.passwordConfirm = "Password no Coinciden";
      } else {
        delete updatedErrors.passwordConfirm; 
      }
    }

    setError(updatedErrors);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true); 

    const validationErrors = validateRegisterLogin(dataUser);

    if (dataUser.password !== dataUser.passwordConfirm) {
      validationErrors.passwordConfirm = "Password no Coinciden";
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const response = await registerUser(dataUser);
      console.log("Usuario Registrado Ingresa con tus Datos:", response);
      setModalContent({
        title: "Éxito",
        message: "Usuario registrado satisfactoriamente. Por favor, inicia sesión.",
      });
      setShowModal(true);
      setTimeout(() => {
        handleCloseModal();
      }, 5000);
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || "Se produjo un error inesperado durante el registro.";
      setModalContent({ title: "Error", message: errorMessage });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="text-center text-green-900 font-bold mt-5 mb-5">
        <div className="relative mb-1">
          <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg shadow-lg shadow-gray-900 z-0"></div>
          <h1 className="text-3xl font-bold text-gray-900 relative z-10">
            Registro en Soluciones JhonDay Servicios Tenológicos
          </h1>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mb-3 rounded-md mx-auto shadow-lg border border-gray-900 bg-white bg-opacity-85 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:max-w-md sm:max-w-sm"
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={dataUser.email}
            onChange={handleChange}
            className={`border-2 w-full p-2 rounded-md focus:outline-none ${error.email ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {isSubmitted && error.email && (
            <p className="text-red-500 text-sm">{error.email}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={dataUser.name}
            onChange={handleChange}
            className={`border-2 w-full p-2 rounded-md focus:outline-none ${error.name ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {isSubmitted && error.name && (
            <p className="text-red-500 text-sm">{error.name}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="age"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Edad
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={dataUser.age}
            onChange={handleChange}
            className={`border-2 w-full p-2 rounded-md focus:outline-none ${error.age ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {isSubmitted && error.age && (
            <p className="text-red-500 text-sm">{error.age}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Teléfono
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={dataUser.phone}
            onChange={handleChange}
            className={`border-2 w-full p-2 rounded-md focus:outline-none ${error.phone ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {isSubmitted && error.phone && (
            <p className="text-red-500 text-sm">{error.phone}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Ciudad
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={dataUser.city}
            onChange={handleChange}
            className={`border-2 w-full p-2 rounded-md focus:outline-none ${error.city ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {isSubmitted && error.city && (
            <p className="text-red-500 text-sm">{error.city}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={dataUser.address}
            onChange={handleChange}
            className={`border-2 w-full p-2 rounded-md focus:outline-none ${error.address ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {isSubmitted && error.address && (
            <p className="text-red-500 text-sm">{error.address}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={dataUser.password}
            onChange={handleChange}
            className={`border-2 w-full p-2 rounded-md focus:outline-none ${error.password ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
          {isSubmitted && error.password && (
            <p className="text-red-500 text-sm">{error.password}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="passwordConfirm"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Confirmar Contraseña
          </label>
          <input
            type={showPasswordConfirm ? "text" : "password"}
            id="passwordConfirm"
            name="passwordConfirm"
            value={dataUser.passwordConfirm}
            onChange={handleChange}
            className={`border-2 w-full p-2 rounded-md focus:outline-none ${error.passwordConfirm ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          <button type="button" onClick={toggleShowPasswordConfirm}>
            {showPasswordConfirm ? "Ocultar" : "Mostrar"}
          </button>
          {isSubmitted && error.passwordConfirm && (
            <p className="text-red-500 text-sm">{error.passwordConfirm}</p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center ">
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Registrarse
          </button>
        </div>
        <div className="mb-5">
          <p className="text-center text-gray-500 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="text-gray-900 hover:text-gray-700 font-bold"
            >
              Inicia Sesión
            </a>
          </p>
        </div>
      </form>

      <AlertModal
        showModal={showModal}
        handleClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    </div>
  );
};

export default Register;
