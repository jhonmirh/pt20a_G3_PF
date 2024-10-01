// import IProduct from "@/interfaces/Products"
// import ICategory from "@/interfaces/Category"
// import { promises } from "dns"

// const APIURL = process.env.NEXT_PUBLIC_API_URL

// export async function getProducts(): Promise<IProduct[]> {
//     try {
//         const res = await fetch(`${APIURL}/products`, {
//             next:{revalidate:1200}
//         })
//         const products: IProduct[] = await res.json();
//         return products;
//     } catch (error: any) {
//         throw new Error(error)
//     }
// };



// export async function getCategory(): Promise<ICategory[]> {
//     try {
//       const res = await fetch(`${APIURL}/categories`, {
//         next: { revalidate: 1200 }
//       })
  
//       if (!res.ok) {
//         throw new Error(`Error ${res.status}: ${res.statusText}`)
//       }
  
//       const categories: ICategory[] = await res.json()
//       return categories
//     } catch (error: any) {
//       console.error('Error al obtener categorías:', error)
//       throw error
//     }
//   }

//   export async function getProductsById(id: string): Promise<IProduct> {
//     try {
//       const products: IProduct[] = await getProducts()
//       const productFilter = products.find((product) => product.id.toString() === id)
//       if (!productFilter) {
//         throw new Error(`Product with id ${id} not found`)
//       }
//       return productFilter
//     } catch (error: any) {
//       console.error('Error al obtener producto:', error)
//       throw error
//     }
//   }

//   export async function getProductsByCategoryId(categoryId: string): Promise<IProduct[]> {
//     try {
//       const response = await fetch(`${APIURL}/categories/${categoryId}/products`);
//       const products: IProduct[] = await response.json();
//       return products;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };
  
  
import IProduct from "@/interfaces/Products"
import ICategory from "@/interfaces/Category"

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function getProducts(): Promise<IProduct[]> {
  try {
    const res = await fetch(`${APIURL}/products`, {
      next:{revalidate:1200}
    })
    const products: IProduct[] = await res.json();
    return products;
  } catch (error: any) {
    throw new Error(error)
  }
};

export async function getCategory(): Promise<ICategory[]> {
  try {
    const res = await fetch(`${APIURL}/categories`, {
      next: { revalidate: 1200 }
    })

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`)
    }

    const categories: ICategory[] = await res.json()
    return categories
  } catch (error: any) {
    console.error('Error al obtener categorías:', error)
    throw error
  }
}

export async function getProductsById(id: string): Promise<IProduct> {
  try {
    const products: IProduct[] = await getProducts()
    const productFilter = products.find((product) => product.id.toString() === id)
    if (!productFilter) {
      throw new Error(`Product with id ${id} not found`)
    }
    return productFilter
  } catch (error: any) {
    console.error('Error al obtener producto:', error)
    throw error
  }
}

export async function getProductsByCategoryId(categoryId: string): Promise<IProduct[] | null> {
  try {
    const response = await fetch(`${APIURL}/categories/${categoryId}/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products: IProduct[] = await response.json();
    return products;
  } catch (error) {
    console.error(error);
    return null;
  }
}


