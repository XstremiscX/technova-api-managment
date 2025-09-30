import { Module } from "@nestjs/common";
import { SaleMapper } from "../../presentations/mappers/sale.mapper";
import { FindAllSalesHandler } from "../../application/handlers/find-all-sales.handler";
import { FindSaleDetailHandler } from "../../application/handlers/find-sale-detail.handler";
import { SaveSaleHandler } from "../../application/handlers/save-sale.handler";
import { SaleRepository } from "../repositories/sale.repository";
import { SaleController } from "../../presentations/controllers/sale.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleEntity } from "../../domain/entities/sale.entity";
import { AuthModule } from "src/app/auth/infrastructure/modules/auth.module";

@Module({
    providers:[
        //Mapper
        SaleMapper,

        //Handlers
        FindAllSalesHandler,
        FindSaleDetailHandler,
        SaveSaleHandler,

        //Repository
        {
            provide:"ISaleRepository",
            useClass:SaleRepository
        }
    ],
    controllers:[
        SaleController
    ],
    imports:[
        CqrsModule,
        AuthModule,
        TypeOrmModule.forFeature([SaleEntity])
    ]
})
export class SaleModule{}