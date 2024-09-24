
import { getProducts } from "@/helpers/product.helper";
import React from "react";
import Card from "../Card/Card";

const CardList = async () => {
  const products = await getProducts();
  return (
    <div className="flex flex-wrap items-baseline p-4 gap-4 justify-center">
      {products &&
        products?.map((product) => {
          return (
            <Card key={product.id} {...product} />
          );
        })}
    </div>
  );
};

export default CardList;
