// "use client";

// import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { NavBarProps } from "./types";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import SignOutConfirmation from "../SignOutConfirmation/SignOutConfirmation";
// import Carousel from "../Carousel/Carousel";
// import { useLoggin } from "@/context/logginContext";
// import { useRouter } from "next/navigation";
// export default function NavBar({ images }: NavBarProps) {
//   const { userData, setUserData } = useLoggin();
//   const router = useRouter();

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSignOut = () => {
//     setIsModalOpen(true);
//   };

//   const confirmSignOut = () => {
//     localStorage.removeItem("sessionStart");
//     setUserData(null);
//     localStorage.removeItem("cart");
//     setIsModalOpen(false);
//     router.push("/");
//   };

//   return (
//     <header className="relative bg-gradient-to-r from-lime-300 to-lime-100 w-full">
//       <div className="flex justify-between items-center p-4">
//         <Link href="/">
//           <Image src="/logo-JhonDay.png" alt="Logo" width={50} height={50} />
//         </Link>

//         <input
//           type="text"
//           placeholder="Search..."
//           className="p-2 rounded border border-gray-300"
//         />

//         <div className="flex items-center space-x-4">
//           <button className="p-2 bg-green-600 text-white rounded hover:bg-green-700">
//             Category
//           </button>

//           <button className="p-2 bg-green-600 text-white rounded hover:bg-green-700">
//             Administrator
//           </button>

//           {userData ? (
//             <>
//               <button className="p-2 bg-green-600 text-white rounded hover:bg-green-700">
//                 Service
//               </button>
//               <Menu as="div" className="relative inline-block text-left">
//                 <div>
//                   <Menu.Button className="flex items-center p-2 bg-green-500 text-white rounded hover:bg-green-700">
//                     {userData?.userData?.name}
//                     <ChevronDownIcon
//                       className="w-5 h-5 ml-2"
//                       aria-hidden="true"
//                     />
//                   </Menu.Button>
//                 </div>
//                 <Transition
//                   as={React.Fragment}
//                   enter="transition ease-out duration-100"
//                   enterFrom="transform opacity-0 scale-95"
//                   enterTo="transform opacity-100 scale-100"
//                   leave="transition ease-in duration-75"
//                   leaveFrom="transform opacity-100 scale-100"
//                   leaveTo="transform opacity-0 scale-95"
//                 >
//                   <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
//                     <div className="px-1 py-1">
//                       <Menu.Item>
//                         {({ active }) => (
//                           <Link href="/dashboard/profiles" legacyBehavior>
//                             <a
//                               className={`${
//                                 active
//                                   ? "bg-green-950 text-white"
//                                   : "bg-green-500 text-white"
//                               } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
//                             >
//                               Profiles
//                             </a>
//                           </Link>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <Link href="/dashboard/orders" legacyBehavior>
//                             <a
//                               className={`${
//                                 active
//                                   ? "bg-green-950 text-white"
//                                   : "bg-green-500 text-white"
//                               } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
//                             >
//                               Orders
//                             </a>
//                           </Link>
//                         )}
//                       </Menu.Item>
//                     </div>
//                   </Menu.Items>
//                 </Transition>
//               </Menu>

//               <button
//                 className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
//                 onClick={handleSignOut}
//               >
//                 Sign Out
//               </button>

//               <Link href="/cart" className="p-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-green-800"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13L3 6m4 0l1 5m13 5h-9m-1 4a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
//                   />
//                 </svg>
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link
//                 href="/login"
//                 className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 href="/register"
//                 className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>

//       <Carousel images={images} />

//       <SignOutConfirmation
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={confirmSignOut}
//         title="Sign Out"
//         message="Are you sure you want to log out?"
//       />
//     </header>
//   );
// }

"use client";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { NavBarProps } from "./types";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignOutConfirmation from "../SignOutConfirmation/SignOutConfirmation";
import Carousel from "../Carousel/Carousel";
import { useLoggin } from "@/context/logginContext";

export default function NavBar({ images }: NavBarProps) {
  const { userData, setUserData } = useLoggin();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = () => {
    setIsModalOpen(true);
  };

  const confirmSignOut = () => {
    localStorage.removeItem("sessionStart");
    setUserData(null);
    localStorage.removeItem("cart");
    setIsModalOpen(false);
    router.push("/");
  };

  // Función para manejar la búsqueda
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/search?query=${searchTerm}`);
    }
  };

  return (
    <header className="relative bg-gradient-to-r from-lime-300 to-lime-100 w-full">
      <div className="flex justify-between items-center p-4">
        <Link href="/">
          <Image src="/logo-JhonDay.png" alt="Logo" width={50} height={50} />
        </Link>

        {/* Cuadro de búsqueda */}
        <div className="relative flex items-center w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pr-10 rounded border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Buscar al presionar Enter
          />
          <button
            onClick={handleSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-lime-200"
            title="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
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
          <Link
            href="/category"
            className="text-green-800 hover:text-green-600"
          >
            Category
          </Link>

          <Link
            href="/administrator"
            className="text-green-800 hover:text-green-600"
          >
            Administrator
          </Link>

          {userData ? (
            <>
              <Link
                href="/service"
                className="text-green-800 hover:text-green-600"
              >
                Service
              </Link>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center text-green-800 hover:text-green-600">
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
                  <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard/profiles"
                            className={`${
                              active
                                ? "bg-green-950 text-white"
                                : "text-green-800"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Profiles
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard/orders"
                            className={`${
                              active
                                ? "bg-green-950 text-white"
                                : "text-green-800"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Orders
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
                Sign Out
              </button>

              <Link
                href="/appointments"
                className="flex items-center p-2"
                title="Your Appointment"
              >
                <span className="ml-1 text-green-800 hover:text-green-600">
                  Add
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-800 hover:text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 3h10M5 3h2v2H5V3zm12 0h2v2h-2V3zM7 7h10M5 7h2v2H5V7zm12 0h2v2h-2V7zM5 11h14v10H5V11z"
                  />
                </svg>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-green-800 hover:text-green-600"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-green-800 hover:text-green-600"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>

      <Carousel images={images} />

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
