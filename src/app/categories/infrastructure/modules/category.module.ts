import { Module } from "@nestjs/common";
import { CategoryRepository } from "../repositories/category.repository";

import { GetAllCategoriesHandler } from "../../application/handlers/get-all-categories.handler";
import { CategoryMapper } from "../../presentations/mappers/category.mapper";
import { CategoryController } from "../../presentations/controllers/category.controller";
import { GetByIdCategoryHandler } from "../../application/handlers/get-by-id-categories.handler";
import { CreateCategoryHandler } from "../../application/handlers/create-category.handler";
import { DeleteCategoryHandler } from "../../application/handlers/delete-category.handler";
import { UpdateCategoryHandler } from "../../application/handlers/update-category.handler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthModule } from "src/app/auth/infrastructure/modules/auth.module";

@Module({
    imports:[
        // Registers the CategoryEntity for TypeORM operations
        TypeOrmModule.forFeature([CategoryEntity]),
        // Enables CQRS command and query buses
        CqrsModule,
        // Imports authentication module for role-based access control
        AuthModule
    ],
    controllers:[CategoryController],
    providers:[
        
        // Provides the repository implementation via its interface token
        {
            provide:"ICategoryRepository",
            useClass: CategoryRepository
        },

        // Provides the mapper for transforming between domain, entity, and DTO
        CategoryMapper,

        // Registers all command and query handlers
        GetAllCategoriesHandler,
        GetByIdCategoryHandler,
        CreateCategoryHandler,
        DeleteCategoryHandler,
        UpdateCategoryHandler
    
    ],
})
export class CategoryModule{}
