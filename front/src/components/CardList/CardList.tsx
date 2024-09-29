import { getProductsByCategoryId } from "@/helpers/product.helper";
import React from "react";
import Card from "../Card/Card";

const CardList = async () => {
  const categoryId = "1"; 
  const products = await getProductsByCategoryId(categoryId);
  return (
    <div className="flex flex-wrap items-baseline p-4 gap-4 justify-center">
      {products !== null && products.length > 0 ? (
        products.map((product) => {
          return (
            <Card key={product.id} {...product} />
          );
        })
      ) : (
        <p>No hay productos en esta categoría</p>
      )}
    </div>
  );
};

export default CardList;