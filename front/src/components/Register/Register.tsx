"use client";
import { registerUser } from "@/helpers/auth.helper";
import { validateRegisterLogin } from "@/helpers/validate";
import { IRegister, TRegisterError } from "@/interfaces/LoginRegister";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AlertModal from "../Alert/AlertModal";

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
  const [error, setError] = useState<TRegisterError>({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue =
      name === "age" || name === "phone" ? (value ? Number(value) : "") : value;

    setData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    if (isSubmitted) {
      const updatedErrors = validateRegisterLogin({
        ...dataUser,
        [name]: newValue,
      });

      if (updatedErrors.password !== dataUser.passwordConfirm) {
        updatedErrors.passwordConfirm = "Password no Coinciden";
      }

      setError(updatedErrors);
    }
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
    } catch (error: any) {
      console.error(error);

      const errorMessage =
        error.message || "Se produjo un error inesperado durante el registro.";

      setModalContent({
        title: "Error",
        message: errorMessage,
      });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/login");
  };

  useEffect(() => {
    if (isSubmitted) {
      const validationErrors = validateRegisterLogin(dataUser);

      if (dataUser.password !== dataUser.passwordConfirm) {
        validationErrors.passwordConfirm = "Password no Coinciden.";
      }

      setError(validationErrors);
    }
  }, [dataUser, isSubmitted]);

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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="nombreCorreo@xxx.com"
            required
          />
          {isSubmitted && error.email && (
            <span className="text-red-600">{error.email}</span>
          )}
        </div>

        <div className="mb-5 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-bold text-green-900"
          >
            Tu Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={dataUser.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="8 Caractéres, Minímo => 1 letra Máyuscula, 1 Letra Minúscula,1 Numero, 1 Digito Especial "
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            style={{ marginRight: "0.5rem", marginTop: "1.7rem" }}
          >
            {showPassword ? (
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.083.326-.17.649-.264.969"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 01.637-2.08M8.25 6.218a3 3 0 014.5 0M9 12a3 3 0 006 0M4.338 4.338l15.324 15.324"
                />
              </svg>
            )}
          </button>
          {isSubmitted && error.password && (
            <span className="text-red-600">{error.password}</span>
          )}
        </div>

        <div className="mb-5 relative">
          <label
            htmlFor="passwordConfirm"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Confirma Tu password
          </label>
          <input
            type={showPasswordConfirm ? "text" : "password"}
            id="passwordConfirm"
            name="passwordConfirm"
            value={dataUser.passwordConfirm}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
            placeholder="********"
            required
          />
          <button
            type="button"
            onClick={toggleShowPasswordConfirm}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            style={{ marginRight: "0.5rem", marginTop: "1.7rem" }}
          >
            {showPasswordConfirm ? (
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.083.326-.17.649-.264.969"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 01.637-2.08M8.25 6.218a3 3 0 014.5 0M9 12a3 3 0 006 0M4.338 4.338l15.324 15.324"
                />
              </svg>
            )}
          </button>
          {isSubmitted && error.passwordConfirm && (
            <span className="text-red-600">{error.passwordConfirm}</span>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nombre Completo"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Teléfono
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={dataUser.phone}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Número de Teléfono"
            required
          />
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Dirección"
            required
          />
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Ciudad"
            required
          />
        </div>

        <div className="mb-5 flex items-center justify-between w-full">
          <button
            type="submit"
            className="w-full h-12 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Registrarse
          </button>
        </div>

        <div className="mb-5">
          <p className="text-center text-gray-500 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              Inicia Sesión
            </a>
          </p>
        </div>
      </form>

      <AlertModal
        show={showModal}
        onClose={handleCloseModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    </div>
  );
};

export default Register;
