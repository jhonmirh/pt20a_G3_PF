import IProduct from "@/interfaces/Products";
import AddApp from "../AddApp/AddApp";
import React from "react";

const ProductId: React.FC<IProduct> = ({
  id,
  name,
  image,
  description,
  price,
  categoryId,
}) => {

  const product: IProduct = {
    id,
    name,
    image,
    description,
    price,
    categoryId,
  };

  console.log(product); // Deberías ver el JSON con las propiedades en tu consola del navegador

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[75%] h-[95vh] bg-white rounded-lg shadow-lg border border-green-950 shadow-green-950 p-6">
        <div className="absolute top-4 right-4">
          <AddApp category={product} />
        </div>
        <h1 className="text-3xl font-bold text-center mb-4">{name}</h1>
        <div className="flex justify-center mb-4">
          <img
            src={image}
            alt={name}
            className="w-[30%] h-[25%] rounded-lg object-cover"
          />
        </div>
        <p className="text-lg text-center mb-2">{description}</p>
        <p className="text-lg text-center mb-4">Precio: ${price}</p>
      </div>
    </div>
  );
};

export default ProductId;
