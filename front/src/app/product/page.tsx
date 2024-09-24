import { getProductsById } from "@/helpers/product.helper";
import React from "react";
import ProductId from "@/components/ProductId/ProductId";
import DetailProductProps from "./[productId]/types";
import DatailProduct from "./[productId]/page";


const DetailProduct: React.FC<DetailProductProps> = async ({ params }) => {
  const { productId } = params;
  const product = await getProductsById(productId);
  return (
    <div>
      <ProductId {...product} />
    </div>
  );
};

export default DatailProduct;
