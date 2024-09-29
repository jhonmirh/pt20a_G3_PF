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

    const imageObj = imageCategory.find((img) => 
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
    };
  });

  console.log(categoriesWithImages);
  return (
    <div className="flex flex-col items-start p-5">
      {categoriesWithImages &&
        categoriesWithImages.map((category) => {
          return (
            <AsideBar
              key={category.id}
              id={category.id}
              name={category.name}
              imageUrl={category.imageUrl}
              hoverImageUrl={category.hoverImageUrl}
              description={category.description}
            />
          );  
        })}
    </div>
  );
};

export default AsideList;