import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllPublicProductsQuery } from "../queries/find-all-public-products.query";
import type { IPublicProductsRepository } from "../../domain/interfaces/ipublic-products-repository.interface";
import { ProductMapper } from "@mappers/seller-products.mapper";
import { Product } from "src/app/commons/domain/entitites/product";
import { ProductItemResponseDto } from "src/app/commons/dtos/response-product-itme.dto";

@QueryHandler(FindAllPublicProductsQuery)
export class FindAllPublicProductsHandler implements IQueryHandler<FindAllPublicProductsQuery>{

    constructor(
        @Inject("IPublicProductsRepository") private readonly productRepository: IPublicProductsRepository<Product>,
        private readonly productMapper: ProductMapper
    ){}

    async execute(query: FindAllPublicProductsQuery): Promise<ProductItemResponseDto[] | []> {
        
        const productList = await this.productRepository.findAll(query.filtersDto);

        if(productList.length == 0) return [];

        return productList.map((product)=>{return this.productMapper.fromDomainToResponseDto(product)});

    }

}