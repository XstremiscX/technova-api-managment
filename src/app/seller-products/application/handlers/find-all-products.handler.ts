import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllProductsQuery } from "../queries/find-all-products.query";
import { Inject } from "@nestjs/common";
import type { ISellerProductRepository } from "../../domain/interfaces/iseller-product-repository.interface";
import { ProductMapper } from "../../../commons/mappers/seller-products.mapper";
import { ProductItemResponseDto } from "../../../commons/dtos/response-product-itme.dto";
import { Product } from "../../../commons/domain/entitites/product";

@QueryHandler(FindAllProductsQuery)
export class FindAllProductHandler implements IQueryHandler<FindAllProductsQuery>{

    constructor(
        @Inject("ISellerProductRepository") private readonly productRepository: ISellerProductRepository<Product>,
        private readonly productMapper: ProductMapper
    ){}

    async execute(query: FindAllProductsQuery): Promise<ProductItemResponseDto[] | []> {

        const productList = await this.productRepository.findAll(query.seller_id);

        if(productList.length == 0) return [];

        return productList.map((product)=>{return this.productMapper.fromDomainToResponseDto(product)});

    }

}