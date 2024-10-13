"use client";
import { useLoggin } from "@/context/logginContext";
import { useState } from "react";

interface CreateProductModalProps {
  categoryId: string;
  onClose: () => void;
  onProductCreated: () => void; // Refresca la lista tras crear producto
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  categoryId,
  onClose,
  onProductCreated,
}) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  //////////////
  const { userData } = useLoggin();
  /////////////
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!product.name) newErrors.name = "El nombre es requerido";
    if (!product.description) newErrors.description = "Descripción requerida";
    if (product.price <= 0) newErrors.price = "El precio debe ser mayor a 0";
    if (!product.image) newErrors.image = "La URL de imagen es requerida";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData?.token}`,
          },
          body: JSON.stringify({
            name: product.name,
            description: product.description,
            price: Number(product.price), 
            image: product.image,
            categoryId, 
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); 
        console.error("Error:", errorData);
        throw new Error(errorData.message || "Error al crear el producto");
      }

      onProductCreated();
      onClose();
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl mb-4">Agregar Producto</h2>
        {["name", "description", "price", "image"].map((field) => (
          <div key={field} className="mb-4">
            <input
              type={field === "price" ? "number" : "text"}
              name={field}
              value={product[field as keyof typeof product]}
              onChange={handleChange}
              placeholder={field}
              className={`border p-2 w-full ${
                errors[field] ? "border-red-600" : "border-gray-300"
              } rounded`}
            />
            {errors[field] && <p className="text-red-600">{errors[field]}</p>}
          </div>
        ))}
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
