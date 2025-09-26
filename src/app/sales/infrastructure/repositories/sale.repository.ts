import { InjectRepository } from "@nestjs/typeorm";
import { ISaleRepository } from "../../domain/interfaces/isale-repository.interface";
import { SaleEntity } from "../../domain/entities/sale.entity";
import { Repository } from "typeorm";
import { Sale } from "../../domain/entities/sale";

export class SaleRepository implements ISaleRepository{

    constructor(
        @InjectRepository(SaleEntity) private readonly saleRepository: Repository<SaleEntity>
    ){}

    async findAllSales(userId: string): Promise<Sale[]> {
        


    }

    async findSaleDetail(userId: string, saleId: string): Promise<Sale> {
     
        
        
    }

}