import IProduct from "@/interfaces/Products"
import { promises } from "dns"

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

export async function getProductsById(id: string): Promise<IProduct> {
    try {
        const products: IProduct[] = await getProducts()
        const productFilter = products.find((product) => product.id.toString() === id)
        if (!productFilter) throw new Error('Not Founded')
        return productFilter;
    } catch (error: any) {
        throw new Error(error)
    }
};