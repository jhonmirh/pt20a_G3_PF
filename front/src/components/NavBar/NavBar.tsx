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

        <div className="relative flex items-center w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pr-10 rounded border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-blue-500"
            title="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m2.15-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              />
            </svg>
          </button>
        </div>

        <nav className="flex items-center space-x-6">
    
    
    {userData?.userData.admin &&
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center text-white hover:text-blue-500 transition-colors duration-300">
                Admin
                <ChevronDownIcon className="w-5 h-5 ml-1" aria-hidden="true" />
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
}



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
