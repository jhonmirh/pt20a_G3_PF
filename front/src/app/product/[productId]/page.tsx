import React from "react";
import DetailProductProps from "./types";
import { getProductsById } from "@/helpers/product.helper";
import ProductId from "@/components/ProductId/ProductId";

const DatailProduct: React.FC<DetailProductProps> = async ({ params }) => {
  const { productId } = params;
  const product = await getProductsById(productId);

  return <ProductId {...product} />;
};

export default DatailProduct;
