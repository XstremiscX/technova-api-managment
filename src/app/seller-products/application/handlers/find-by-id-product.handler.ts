import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindByIdProductQuery } from "../queries/find-by-id-product.query";
import { Inject } from "@nestjs/common";
import { ProductDetailResponseDto } from "../../presentations/dtos/response-product-detail.dto";
import type { ISellerProductRepository } from "../../domain/interfaces/iseller-product-repository.interface";
import { SellerProduct } from "../../domain/entities/seller-product";


@QueryHandler(FindByIdProductQuery)
export class FindByIdProductHandler implements IQueryHandler<FindByIdProductQuery>{

    constructor(
        @Inject("ISellerProductRepository") private readonly productRepository: ISellerProductRepository<SellerProduct>
    ){}

    async execute(query: FindByIdProductQuery): Promise<ProductDetailResponseDto> {
        
        const product = await this.productRepository.findById(query.id);

        return {description:product.getDescription(),details:product.getDetails(),seller_id:product.getSeller_id()}

    }

}