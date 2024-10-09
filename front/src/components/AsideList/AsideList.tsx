import React from "react";
import { getCategory } from "@/helpers/product.helper";
import AsideBar from "../Aside/Aside";
import imageCategory from "./type";

const AsideList = async () => {
  const categories = await getCategory();

  const categoriesWithImages = categories.map((category) => {
    const normalizedCategoryName = category.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();

    const imageObj = imageCategory.find(
      (img) =>
        img.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .trim()
          .toLowerCase() === normalizedCategoryName
    );

    return {
      ...category,
      imageUrl: imageObj ? imageObj.imageUrl : "",
      hoverImageUrl: imageObj ? imageObj.hoverImageUrl : "",
      description: imageObj ? imageObj.description : "",
      ribbonText: imageObj ? imageObj.ribbonText : "",
      image: imageObj ? imageObj.image: "", 
      price: category.price || "0.00", // Adjust based on your data structure
    };
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {categoriesWithImages && categoriesWithImages.map((category) => (
        <AsideBar
          key={category.id}
          id={category.id}
          name={category.name}
          price={category.price}
          categoryId={category.id}
          imageUrl={category.imageUrl}
          hoverImageUrl={category.hoverImageUrl}
          description={category.description}
          ribbonText={category.ribbonText}
          image={category.image} 
        />
      ))}
    </div>
  );
};

export default AsideList;
