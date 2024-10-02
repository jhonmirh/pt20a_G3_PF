import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Product } from "src/products/products.entity";
import { HttpException, HttpStatus } from '@nestjs/common';@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(category);
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findOne(id: string): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }


    async findProductsByCategory(categoryId: string): Promise<Product[]> {
        const category = await this.categoryRepository.findOne({
          where: { id: categoryId },
          relations: ['products'],
        });
        if (!category) {
          throw new HttpException("Category not found", HttpStatus.NOT_FOUND);
        }
        return category.products; // Asegúrate de que esto devuelve un array de productos
      }
    }                                                           