// // import React from "react";
// // import DetailProductProps from "./types";
// // import ProductId from "@/components/ProductId/ProductId";
// // import { getProductsByCategoryId } from "@/helpers/product.helper";
// // const DatailProduct: React.FC<DetailProductProps> = async ({ params }) => {
// //   const { productId } = params;
// //   const product = await getProductsByCategoryId(productId);

// //   return <ProductId {...product} />;
// // };

// // export default DatailProduct;

// import React from "react";
// import DetailProductProps from "./types";
// import ProductId from "@/components/ProductId/ProductId";
// import { getProductsByCategoryId } from "@/helpers/product.helper";

// const DatailProduct: React.FC<DetailProductProps> = async ({ params }) => {
//   const { categoryId } = params;
//   const products = await getProductsByCategoryId(categoryId);
//   const productId = params.productId.toString(); 
//   const product = products?.find((product) => product.id === productId);

//   if (!product) {
//     return <div>Producto no encontrado</div>;
//   }

//   return <ProductId {...product} />;
// };

// export default DatailProduct;

// import React from "react";
// import ProductId from "@/components/CategoryId/CategoryId";

// interface DatailProductProps {
//   products: any[];
// }

// const DatailProduct: React.FC<DatailProductProps> = ({ products }) => {
//   return (
//     <div>
 
      
//       {products.map((product) => (
//         <ProductId key={product.id} {...product} />
//       ))}
//     </div>
//   );
// };

// export default DatailProduct;