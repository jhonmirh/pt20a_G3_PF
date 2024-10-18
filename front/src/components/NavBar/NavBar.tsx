"use client";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { NavBarProps } from "./types";
import { useRouter } from "next/navigation";
import { useLoggin } from "@/context/logginContext";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SignOutConfirmation from "../SignOutConfirmation/SignOutConfirmation";
import Carousel from "../Carousel/Carousel";

export default function NavBar({ images }: NavBarProps) {
  const { userData, setUserData } = useLoggin();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = () => {
    setIsModalOpen(true);
  };

  const isProfileComplete = () => {
    if (!userData || !userData.userData) return false;
    const { age, phone, address, city } = userData.userData;
    return age && phone && address && city;
  };
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Previene el comportamiento predeterminado de <Link>

    if (!isProfileComplete()) {
      // Si el perfil no está completo, redirige a /completar-perfil
      router.push("/completar-perfil");
    } else {
      // Si el perfil está completo, redirige a la página principal
      router.push("/");
    }
  };
  const confirmSignOut = () => {
    localStorage.removeItem("sessionStart");
    setUserData(null);
    localStorage.removeItem("appointment");
    setIsModalOpen(false);
    router.push("/");
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/search?query=${searchTerm}`);
    }
  };

  return (
    <header className="relative bg-gray-900 shadow-md w-full">
      <div className="flex justify-between items-center p-4">
        <Link href="/">
          <Image src="/logo-JhonDay3.png" alt="Logo" width={50} height={50} />
        </Link>

        <div className="flex items-center w-full max-w-md justify-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold whitespace-nowrap relative">
            SERVICIOS TECNOLÓGICOS INTEGRALES JHONDAY
            <span className="absolute inset-0 text-gray-500 blur-[2px] translate-x-1 translate-y-1">
              SERVICIOS TECNOLÓGICOS INTEGRALES JHONDAY
            </span>
          </h1>
        </div>

        <nav className="flex items-center space-x-6">
          {userData?.userData.admin && (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center text-white hover:text-blue-500 transition-colors duration-300">
                  Admin
                  <ChevronDownIcon
                    className="w-5 h-5 ml-1"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-gray-800 border border-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/dashboardAdmin/appointments"
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-white"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Turnos
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/dashboardAdmin/categories"
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-white"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Servicios
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/dashboardAdmin/users"
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-white"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Usuarios Registrados
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}

          {userData ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center text-white hover:text-blue-500 transition-colors duration-300">
                    {userData?.userData?.name}
                    <ChevronDownIcon
                      className="w-5 h-5 ml-1"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-gray-800 border border-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard/profiles"
                            className={`${
                              active ? "bg-blue-500 text-white" : "text-white"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Perfil
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard/orders"
                            className={`${
                              active ? "bg-blue-500 text-white" : "text-white"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Turnos
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                className="text-red-600 hover:text-red-800"
                onClick={handleSignOut}
              >
                Cerrar Sesión
              </button>

              <Link
                href="/appointments"
                className="flex items-center p-2"
                title="Your Appointment"
              >
                <span className="ml-1 text-white hover:text-blue-500">
                  Citas
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white hover:text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 3h10M5 3h2v2H5V3zM7 7h10M5 7h2v2H5V7zM5 11h14v10H5V11z"
                  />
                </svg>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white hover:text-blue-500 transition-colors duration-300"
              >
                Ingresar
              </Link>
              <Link
                href="/register"
                className="text-white hover:text-blue-500 transition-colors duration-300"
              >
                Registro
              </Link>
            </>
          )}
        </nav>
      </div>

      <Carousel />

      <SignOutConfirmation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmSignOut}
        title="Sign Out"
        message="Are you sure you want to log out?"
      />
    </header>
  );
}
