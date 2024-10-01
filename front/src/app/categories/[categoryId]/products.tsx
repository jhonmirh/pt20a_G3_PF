// /app/categories/[categoryId]/products.tsx

import React, { useEffect, useState } from "react";
import { getProductsByCategoryId } from "@/helpers/product.helper";
import IProduct from "@/interfaces/Products";
import ProductId from "@/components/CategoryId/CategoryId";

const ProductsPage = ({ params }: { params: { categoryId: string } }) => {
  const [products, setProducts] = useState<IProduct[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log(`Fetching products for categoryId: ${params.categoryId}`);
      const fetchedProducts = await getProductsByCategoryId(params.categoryId);
      console.log(fetchedProducts); // Verifica si se obtienen los productos
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, [params.categoryId]);

  return (
    <div>
      {products ? (
        products.map((product) => (
          <ProductId key={product.id} {...product} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductsPage;
