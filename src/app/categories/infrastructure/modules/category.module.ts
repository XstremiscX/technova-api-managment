import { Module } from "@nestjs/common";
import { CategoryRepository } from "../repositories/category.repository";

import { GetAllCategoriesHandler } from "../../application/handlers/get-all-categories.handler";
import { CategoryMapper } from "../../presentations/mappers/category.mapper";
import { CategoryController } from "../../presentations/controllers/category.controller";
import { GetByIdCategoryHandler } from "../../application/handlers/get-by-id-categories.handler";
import { CreateCategoryHandler } from "../../application/handlers/create-category.handler";
import { DeleteCategoryhandler } from "../../application/handlers/delete-category.handler";
import { UpdateCategoryHandler } from "../../application/handlers/update-category.handler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthModule } from "src/app/auth/infrastructure/modules/auth.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([CategoryEntity]),
        CqrsModule,
        AuthModule
    ],
    controllers:[CategoryController],
    providers:[
        
        //Repository
        {
            provide:"ICategoryRepository",
            useClass: CategoryRepository
        },

        //Mapper
        CategoryMapper,

        //handlers
        GetAllCategoriesHandler,
        GetByIdCategoryHandler,
        CreateCategoryHandler,
        DeleteCategoryhandler,
        UpdateCategoryHandler
    
    ],
})
export class CategoryModule{}
