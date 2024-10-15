"use client";

import { useLoggin } from "@/context/logginContext";
import React, { useEffect, useState } from "react";
import { deleteCategory } from "@/helpers/category.helper";
import { updateCategory } from "@/helpers/category.helper";
import { useRouter } from "next/navigation";
import EditCategory from "../EditCategory/EditCategory";
import ICategory from "@/interfaces/Category";
import CreateProductModal from "../CreateProductModal/CreateProductModal";
import AlertModal from "../Alert/AlertModal";


const CategoryList = () => {
  const { userData } = useLoggin();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(
    null
  );

  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const openAddProductModal = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setProductModalOpen(true);
  };

  const handleProductCreated = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al recargar las categorías");

      const data = await response.json();
      setCategories(data); 
    } catch (error) {
      console.error("Error al recargar las categorías:", error);
    } finally {
      setProductModalOpen(false); 
    }
  };

  /////////////////////////
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (!userData?.token && !userData?.userData?.address) {
      setModalContent({
        title: "Acceso Denegado",
        message: "Debe estar Logueado para Acceder a Este Espacio",
      });
      setShowModal(true);
      console.log("Mostrando Modal: ", showModal);
    }
  }, [userData, showModal]);

  const handleCloseModalUser = () => {
    setShowModal(false);
    router.push("/login");
  };

  ////////////////////////

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          {
            headers: { Authorization: `Bearer ${userData?.token || ""}` },
          }
        );
        const data = await response.json();

        // Asegúrate de que data es un array
        if (Array.isArray(data)) {
          setCategories(data);
          setFilteredCategories(data);
        } else {
          console.error("La API no devolvió un array:", data);
          setCategories([]);
          setFilteredCategories([]);
        }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
        setCategories([]);
        setFilteredCategories([]);
      }
    };
    fetchCategories();
  }, [userData]);

  useEffect(() => {
    const filtered = searchTerm
      ? categories.filter((category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : categories;

    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleEdit = (category: ICategory) => setEditingCategory(category);

  const handleDelete = (category: ICategory) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete.id, userData?.token);
        setCategories((prev) =>
          prev.filter((cat) => cat.id !== categoryToDelete.id)
        );
        setDeleteModalOpen(false);
        setCategoryToDelete(null);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error al eliminar la categoría:", error.message);
        } else {
          console.error("Error desconocido:", error);
        }
      }
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar por nombre de categoría..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <table className="min-w-full border border-gray-900">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-900">
          {Array.isArray(filteredCategories) &&
          filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <tr key={category.id} className="border-b border-gray-900">
                <td className="p-2">{category.name}</td>
                <td className="p-2">{category.price} $</td>
                <td className="p-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => openAddProductModal(category.id)} // Abrir el modal con el ID
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-500"
                    >
                      Agregar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No se encontraron categorías.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">
              ¿Estás seguro de que deseas eliminar la categoría{" "}
              <span className="font-bold">{categoryToDelete?.name}</span>?
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

      {editingCategory && (
        <EditCategory
          categories={editingCategory} // Asegúrate de que sea la categoría correcta
          onSave={async (category) => {
            try {
              // Asegúrate de enviar el precio como número
              const updatedCategory = await updateCategory(
                category.id,
                {
                  ...category,
                  price: Number(category.price), // Convierte el precio a número
                },
                userData?.token
              );

              setCategories((prev) =>
                prev.map((cat) =>
                  cat.id === updatedCategory.id ? updatedCategory : cat
                )
              );
              setEditingCategory(null);
            } catch (error) {
              console.error("Error al guardar los cambios:", error);
            }
          }}
          onCancel={() => setEditingCategory(null)}
        />
      )}

      {isProductModalOpen && selectedCategoryId && (
        <CreateProductModal
          categoryId={selectedCategoryId}
          onClose={() => setProductModalOpen(false)}
          onProductCreated={handleProductCreated}
        />
      )}

      
      <AlertModal
        showModal={showModal}
        handleClose={handleCloseModalUser}
        title={modalContent.title}
        message={modalContent.message}
      />
    </div>
  );
};

export default CategoryList;
