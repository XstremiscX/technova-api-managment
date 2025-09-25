import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllProductsQuery } from "../queries/find-all-products.query";
import { Inject, UnauthorizedException } from "@nestjs/common";
import type { ISellerProductRepository } from "../../domain/interfaces/iseller-product-repository.interface";
import { SellerProductMapper } from "../../presentations/mappers/seller-products.mapper";
import { ProductItemResponseDto } from "../../presentations/dtos/response-product-itme.dto";
import { SellerProduct } from "../../domain/entities/seller-product";

@QueryHandler(FindAllProductsQuery)
export class FindAllProductHandler implements IQueryHandler<FindAllProductsQuery>{

    constructor(
        @Inject("ISellerProductRepository") private readonly productRepository: ISellerProductRepository<SellerProduct>,
        private readonly productMapper: SellerProductMapper
    ){}

    async execute(query: FindAllProductsQuery): Promise<ProductItemResponseDto[] | []> {

        const productList = await this.productRepository.findAll(query.seller_id);

        if(productList.length == 0) return [];

        return productList.map((product)=>{return this.productMapper.fromDomainToResponseDto(product)});

    }

}