import { ProductMapper } from "@mappers/seller-products.mapper";
import { Module } from "@nestjs/common";
import { FindAllPublicProductsHandler } from "../../application/handlers/find-all-public-products.handler";
import { FindByIdPublicProductHandler } from "../../application/handlers/find-by-id-public-products.handler";
import { PublicProductsRepository } from "../repositories/public-products.repository";
import { PublicProductsController } from "../../presentation/controllers/public-products.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/app/commons/domain/entitites/product.entity";

@Module({
    providers:[
        //Mapper
        ProductMapper,

        //Handlers
        FindAllPublicProductsHandler,
        FindByIdPublicProductHandler,

        //Repository
        {
            provide:"IPublicProductsRepository",
            useClass:PublicProductsRepository
        }
    ],
    controllers:[PublicProductsController],
    imports:[
        CqrsModule,
        TypeOrmModule.forFeature([ProductEntity])
    ]
})
export class PublicProductModule{}