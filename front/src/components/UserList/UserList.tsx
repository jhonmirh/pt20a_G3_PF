// "use client";

// import { useLoggin } from "@/context/logginContext";
// import React, { useEffect, useState } from "react";
// import { IUsersUpdate } from "@/interfaces/LoginRegister";
// import EditUserForm from "../Modal/Modal";
// import { updateUserData } from "@/helpers/users.helper";
// import AppointmentModal from "../AppointmentModal/AppointmentModat"; // Asegúrate de importar el modal de citas
// import AlertModal from "../Alert/AlertModal"; // Asegúrate de importar el modal de alerta
// import { IAppointmentData } from "@/interfaces/Appointment";

// const UserList = () => {
//   const { userData } = useLoggin();
//   const [users, setUsers] = useState<IUsersUpdate[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<IUsersUpdate[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingUsers, setEditingUsers] = useState<IUsersUpdate | null>(null);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState<IUsersUpdate | null>(null);
//   const [appointments, setAppointments] = useState<IAppointmentData[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [alertModalOpen, setAlertModalOpen] = useState(false); // Estado para el modal de alerta

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/users`,
//           {
//             headers: { Authorization: `Bearer ${userData?.token}` },
//           }
//         );
//         const data = await response.json();

//         if (Array.isArray(data)) {
//           setUsers(data);
//           setFilteredUsers(data);
//         } else {
//           console.error("La API no devolvió un array:", data);
//           setUsers([]);
//           setFilteredUsers([]);
//         }
//       } catch (error) {
//         console.error("Error al obtener los usuarios:", error);
//         setUsers([]);
//         setFilteredUsers([]);
//       }
//     };
//     fetchUsers();
//   }, [userData]);

//   useEffect(() => {
//     const filtered = searchTerm
//       ? users.filter(
//           (user) =>
//             user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             user.email.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       : users;

//     setFilteredUsers(filtered);
//   }, [searchTerm, users]);

//   const handleEdit = (user: IUsersUpdate) => setEditingUsers(user);

//   const handleDelete = (user: IUsersUpdate) => {
//     setUserToDelete(user);
//     setDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (userToDelete) {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/users/${userToDelete.id}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${userData?.token}` },
//         }
//       );
//       if (response.ok) {
//         setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
//         setDeleteModalOpen(false);
//         setUserToDelete(null);
//       }
//     }
//   };

//   const handleSave = async (user: IUsersUpdate) => {
//     try {
//       const updatedUser = await updateUserData(user.id, user, userData?.token);
//       setUsers((prev) =>
//         prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
//       );
//       setEditingUsers(null);
//     } catch (error) {
//       console.error("Error al guardar los cambios:", error);
//     }
//   };

//   const handleEditAppointments = async (userId: string) => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/appointments`,
//         {
//           headers: { Authorization: `Bearer ${userData?.token}` },
//         }
//       );
//       const data = await response.json();

//       if (Array.isArray(data) && data.length > 0) {
//         setAppointments(data);
//         setIsModalOpen(true); // Abre el modal de citas
//       } else {
//         setAlertModalOpen(true); // Abre el modal de alerta
//       }
//     } catch (error) {
//       console.error("Error al obtener las citas del usuario:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <input
//         type="text"
//         placeholder="Buscar por nombre o email..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="mb-4 p-2 border border-gray-300 rounded w-full"
//       />

//       <table className="min-w-full border border-gray-900">
//         <thead className="bg-gray-900 text-white">
//           <tr>
//             <th className="p-2">Nombre</th>
//             <th className="p-2">Email</th>
//             <th className="p-2">Teléfono</th>
//             <th className="p-2">Edad</th>
//             <th className="p-2">Acciones</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white text-gray-900">
//           {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
//             filteredUsers.map((user) => (
//               <tr key={user.id} className="border-b border-gray-900">
//                 <td className="p-2">{user.name}</td>
//                 <td className="p-2">{user.email}</td>
//                 <td className="p-2">{user.phone}</td>
//                 <td className="p-2">{user.age}</td>
//                 <td className="p-2">
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleEdit(user)}
//                       className="bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-700"
//                     >
//                       Editar
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user)}
//                       className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
//                     >
//                       Eliminar
//                     </button>
//                     <button
//                       onClick={() => handleEditAppointments(user.id)} // Llama a la función para editar citas
//                       className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-500"
//                     >
//                       Editar Cita
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={5} className="text-center p-4">
//                 No se encontraron usuarios.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-xl mb-4">
//               ¿Estás seguro de que deseas eliminar a{" "}
//               <span className="font-bold">{userToDelete?.name}</span>?
//             </h2>
//             <div className="flex space-x-4">
//               <button
//                 onClick={handleConfirmDelete}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
//               >
//                 Eliminar
//               </button>
//               <button
//                 onClick={() => setDeleteModalOpen(false)}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Cancelar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {editingUsers && (
//         <EditUserForm
//           users={editingUsers}
//           onSave={handleSave}
//           onCancel={() => setEditingUsers(null)}
//         />
//       )}


//       {alertModalOpen && (
//         <AlertModal
//           showModal={alertModalOpen}
//           handleClose={() => setAlertModalOpen(false)}
//           title="No hay citas"
//           message="El usuario no posee citas registradas."
//         />
//       )}
//     </div>
//   );
// };

// export default UserList;


"use client";

import { useLoggin } from "@/context/logginContext";
import React, { useEffect, useState } from "react";
import { IUsersUpdate } from "@/interfaces/LoginRegister";
import EditUserForm from "../Modal/Modal";
import { updateUserData } from "@/helpers/users.helper";
import AppointmentModalAdmin from "../AppointmentModalAdmin/AppointmentModalAdmin";
import AlertModal from "../Alert/AlertModal"; // Asegúrate de importar el modal de alerta
import { IAppointmentData } from "@/interfaces/Appointment";

const UserList = () => {
  const { userData } = useLoggin();
  const [users, setUsers] = useState<IUsersUpdate[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUsersUpdate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUsers, setEditingUsers] = useState<IUsersUpdate | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUsersUpdate | null>(null);
  const [appointments, setAppointments] = useState<IAppointmentData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false); // Estado para el modal de alerta

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            headers: { Authorization: `Bearer ${userData?.token}` },
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data);
          setFilteredUsers(data);
        } else {
          console.error("La API no devolvió un array:", data);
          setUsers([]);
          setFilteredUsers([]);
        }
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setUsers([]);
        setFilteredUsers([]);
      }
    };
    fetchUsers();
  }, [userData]);

  useEffect(() => {
    const filtered = searchTerm
      ? users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : users;

    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleEdit = (user: IUsersUpdate) => setEditingUsers(user);

  const handleDelete = (user: IUsersUpdate) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userToDelete.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${userData?.token}` },
        }
      );
      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
        setDeleteModalOpen(false);
        setUserToDelete(null);
      }
    }
  };

  const handleSave = async (user: IUsersUpdate) => {
    try {
      const updatedUser = await updateUserData(user.id, user, userData?.token);
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setEditingUsers(null);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleEditAppointments = async (userId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${userId}/appointments`, // Ajuste a la ruta correcta
        {
          headers: { Authorization: `Bearer ${userData?.token}` },
        }
      );
      
      // Comprobar el estado de la respuesta
      if (!response.ok) {
        throw new Error(`Error en la respuesta: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
  
      // Imprimir la respuesta en la consola para depuración
      console.log("Citas obtenidas:", data);
  
      if (Array.isArray(data) && data.length > 0) {
        setAppointments(data);
        setIsModalOpen(true); // Abre el modal de citas
      } else {
        setAlertModalOpen(true); // Abre el modal de alerta
      }
    } catch (error) {
      console.error("Error al obtener las citas del usuario:", error);
      setAlertModalOpen(true); // También abre el modal de alerta en caso de error
    }
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <table className="min-w-full border border-gray-900">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Email</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Edad</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-900">
          {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-900">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.phone}</td>
                <td className="p-2">{user.age}</td>
                <td className="p-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleEditAppointments(user.id)} // Llama a la función para editar citas
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-500"
                    >
                      Editar Cita
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">
              ¿Estás seguro de que deseas eliminar a{" "}
              <span className="font-bold">{userToDelete?.name}</span>?
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                Eliminar
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {editingUsers && (
        <EditUserForm
          users={editingUsers}
          onSave={handleSave}
          onCancel={() => setEditingUsers(null)}
        />
      )}

      {alertModalOpen && (
        <AlertModal
          showModal={alertModalOpen}
          handleClose={() => setAlertModalOpen(false)}
          title="No hay citas"
          message="El usuario no posee citas registradas."
        />
      )}

      {/* Modal para mostrar citas */}
      {isModalOpen && (
        <AppointmentModalAdmin
          appointment={appointments}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UserList;
