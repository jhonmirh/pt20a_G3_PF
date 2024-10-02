import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesService } from "./categories.services";
import { CategoriesController } from "./category.controller";
import { Category } from "./entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoriesService],
    controllers: [CategoriesController],
    exports: [CategoriesService],
})
export class CategoriesModule {}