import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindByIdPublicProductQuery } from "../queries/find-by-id-public-product.query";
import { Inject } from "@nestjs/common";
import type { IPublicProductsRepository } from "../../domain/interfaces/ipublic-products-repository.interface";
import { Product } from "src/app/commons/domain/entitites/product";
import { ProductMapper } from "@mappers/seller-products.mapper";
import { ProductItemResponseDto } from "src/app/commons/dtos/response-product-itme.dto";

@QueryHandler(FindByIdPublicProductQuery)
export class FindByIdPublicProductHandler implements IQueryHandler<FindByIdPublicProductQuery>{

    constructor(
        @Inject("IPublicProductsRepository") private readonly productRepository: IPublicProductsRepository<Product>,
        private readonly productMapper:ProductMapper
    ){}

    async execute(query: FindByIdPublicProductQuery): Promise<ProductItemResponseDto> {
        
        const product = await this.productRepository.findById(query.id);

        return this.productMapper.fromDomainToResponseDto(product);

    }
    
}