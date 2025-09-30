import { InjectRepository } from "@nestjs/typeorm";
import { ISaleRepository } from "../../domain/interfaces/isale-repository.interface";
import { SaleEntity } from "../../domain/entities/sale.entity";
import { Repository } from "typeorm";
import { Sale } from "../../domain/entities/sale";
import { UserEntity } from "src/app/users/domain/entities/user.entity";
import { SaleMapper } from "../../presentations/mappers/sale.mapper";
import { SaleDetailsResponseDto } from "../../presentations/dtos/response-sale-details.dto";
import { NotFoundException } from "@nestjs/common";

export class SaleRepository implements ISaleRepository{

    constructor(
        @InjectRepository(SaleEntity) private readonly saleRepository: Repository<SaleEntity>,
        private readonly saleMapper: SaleMapper
    ){}

    async findAllSales(userId: string, userType:string): Promise<Sale[] | []> {

        const findOptions:any = {};

        const user = new UserEntity();

        user.id = userId
        
        if(userType == "SELLER") findOptions.seller = user;
        if(userType == "BUYER") findOptions.buyer = user;
        
        const salesList = await this.saleRepository.find({where:findOptions});

        if(salesList.length == 0) return [];

        return salesList.map((sale)=>{return this.saleMapper.toDomainFromEntity(sale)});

    }

    async findSaleDetail(saleId: string, ): Promise<Sale> {

        const sale = await this.saleRepository.findOne({where:{id:saleId}, loadRelationIds:true});

        if(!sale) throw new NotFoundException(`Sale with id: ${saleId} not found.`);

        return this.saleMapper.toDomainFromEntity(sale);
        
    }

    async saveSale(sale: Sale): Promise<Sale> {
        
        const saleEntity = this.saleMapper.toEntityFromDomain(sale);

        const saleSaved = await this.saleRepository.save(saleEntity);

        if(!saleSaved) throw new NotFoundException("Sale not found after creation");

        return this.saleMapper.toDomainFromEntity(saleSaved);

    }

}