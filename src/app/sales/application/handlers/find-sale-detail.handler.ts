import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindSaleDetailQuery } from "../queries/find-sale-detail-query";
import { Inject } from "@nestjs/common";
import type { ISaleRepository } from "../../domain/interfaces/isale-repository.interface";
import { SaleMapper } from "../../presentations/mappers/sale.mapper";
import { SaleDetailsResponseDto } from "../../presentations/dtos/response-sale-details.dto";

@QueryHandler(FindSaleDetailQuery)
export class FindSaleDetailHandler implements IQueryHandler<FindSaleDetailQuery>{

    constructor(
        @Inject("ISaleRepository") private readonly saleRepository: ISaleRepository,
        private readonly saleMapper:SaleMapper
    ){}

    async execute(query: FindSaleDetailQuery): Promise<SaleDetailsResponseDto> {
        
        const saleDetails = await this.saleRepository.findSaleDetail(query.saleId);

        return {buyer:saleDetails.getBuyer(),seller:saleDetails.getSeller(),details:saleDetails.getDetails()}

    }

}