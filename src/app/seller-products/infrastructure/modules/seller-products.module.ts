import { Module } from "@nestjs/common";
import { ProductMapper } from "../../../commons/mappers/seller-products.mapper";
import { CreateProductHandler } from "../../application/handlers/create-product.handler";
import { UpdateProductHandler } from "../../application/handlers/update-product.handler";
import { DeleteProductHandler } from "../../application/handlers/delete-product.handler";
import { FindAllProductHandler } from "../../application/handlers/find-all-products.handler";
import { FindByIdProductHandler } from "../../application/handlers/find-by-id-product.handler";
import { SellerProductRepository } from "../repositories/seller-product.repository";
import { SellerProductsController } from "../../presentations/controllers/seller-products.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "../../../commons/domain/entitites/product.entity";
import { AuthModule } from "src/app/auth/infrastructure/modules/auth.module";

@Module({
    providers:[
        //Mapper
        ProductMapper,

        //Handlers
        CreateProductHandler,
        UpdateProductHandler,
        DeleteProductHandler,
        FindAllProductHandler,
        FindByIdProductHandler,

        //Repository
        {
            provide:"ISellerProductRepository",
            useClass:SellerProductRepository
        }

    ],
    controllers:[SellerProductsController],
    imports:[
        CqrsModule,
        AuthModule,
        TypeOrmModule.forFeature([ProductEntity])
    ]
})
export class SellerProductsModule {}