export interface DetailProductProps {
    params: {
      productId: string;
      name:string;
      description:string;
      price:number;
      stock:number;
      image:string;
      categoryId:string;
    };
  }

export default DetailProductProps;