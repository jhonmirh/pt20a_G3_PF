import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Category } from "src/category/entities/category.entity";
import { SearchDto } from "./dto/search-product.dto";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }
    async create(createProductDto: CreateProductDto): Promise<Product> {
        const newProduct = this.productRepository.create(createProductDto);
        return await this.productRepository.save(newProduct);
    }

    async getProducts(page: number, limit: number) {
        return await this.productRepository.find({
            take: limit,
            skip: (page - 1) * limit,
        });
    }

    async findOne(id: string): Promise<Product> {
        return await this.productRepository.findOneBy({ id });
    }


    async update(
        id: string,
        updateProductDto: UpdateProductDto
    ): Promise<Product> {
        console.log("updateProductDto", updateProductDto);
    
        // Intenta actualizar el producto
        const result = await this.productRepository.update(id, updateProductDto);
    
        // Verifica si se actualizó algún registro
        if (result.affected === 0) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
    
        // Retorna el producto actualizado
        return this.productRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<{ id: string }> {
        await this.productRepository.delete(id);
        return { id };
    }


    
  //*implementacion a pedido de Jhon forntend

  async checkProductExists(itemId: string): Promise<boolean> {
    const item = await this.productRepository.findOne({ where: { id: itemId } });
    return !!item; // Devuelve true si el item existe, false si no
}

async getProductsService(): Promise<Product[]> {
    return await this.productRepository.find(); // Devuelve todos los productos
}

//* implementacion para demo 1/2, logica busqueda de barra
async searchProducts(searchDto: SearchDto): Promise<Product[]> {
    const { productName, categoryName } = searchDto;

    let products: Product[] = [];

    if (categoryName) {
        // Busca la categoría por nombre
        const category = await this.categoryRepository.findOne({ where: { name: categoryName } });
        if (category) {
            // Si se encuentra la categoría, busca productos de esa categoría
            products = await this.productRepository.find({
                where: { category: { id: category.id } },
            });
        }
    }

    if (productName) {
        // Busca productos que coincidan con el nombre del producto
        const productResults = await this.productRepository.find({
            where: { name: productName },
        });
        products = [...products, ...productResults]; // Agrega los productos encontrados
    }

    return products; // Retorna todos los productos encontrados
}
}