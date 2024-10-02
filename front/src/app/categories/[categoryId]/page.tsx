'use client'
import React, { useEffect, useState } from "react";
import IProduct from "@/interfaces/Products";
import ProductId from "@/components/CategoryId/CategoryId";

const ProductsPage = ({ params }: { params: { categoryId: string } }) => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const APIURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${APIURL}/categories/${params.categoryId}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, [params.categoryId, APIURL]);

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
