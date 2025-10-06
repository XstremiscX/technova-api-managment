import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllSalesQuery } from "../queries/find-all-sales.query";
import { Inject } from "@nestjs/common";
import type { ISaleRepository } from "../../domain/interfaces/isale-repository.interface";
import { SaleMapper } from "../../presentations/mappers/sale.mapper";
import { SaleItemResponseDto } from "../../presentations/dtos/response-sale-item.dto";

// Handler for FindAllSalesQuery: returns a list of sales for the given user
@QueryHandler(FindAllSalesQuery)
export class FindAllSalesHandler implements IQueryHandler<FindAllSalesQuery>{

    constructor(
        @Inject("ISaleRepository") private readonly saleRepository:ISaleRepository,
        private readonly saleMapper:SaleMapper
    ){}

    async execute(query: FindAllSalesQuery): Promise<SaleItemResponseDto[] | []> {
        
        const saleList = await this.saleRepository.findAllSales(query.userId,query.userType);

        if(saleList.length == 0) return [];

        return saleList.map((sale) => {return this.saleMapper.toResponseDtoFromDomain(sale)});

    }

}