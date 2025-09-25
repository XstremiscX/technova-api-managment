import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { CreateProductCommand } from "../commands/create-product.command";
import { Inject } from "@nestjs/common";
import type { ISellerProductRepository } from "../../domain/interfaces/iseller-product-repository.interface";
import { SellerProductMapper } from "../../presentations/mappers/seller-products.mapper";
import { ProductItemResponseDto } from "../../presentations/dtos/response-product-itme.dto";
import { SellerProduct } from "../../domain/entities/seller-product";
import {v4 as uuid} from 'uuid';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand>{

    constructor(
        @Inject("ISellerProductRepository") private readonly productRepo: ISellerProductRepository<SellerProduct>,
        private readonly productMapper: SellerProductMapper
    ){}

    async execute(command: CreateProductCommand): Promise<ProductItemResponseDto> {

        const newProduct = new SellerProduct(
            command.name,
            command.image,
            command.description,
            command.price,
            command.stock,
            command.details,
            command.brand,
            command.category,
            command.seller_id,
            1,
            uuid(),
            new Date()
        )

        const createdProduct = await this.productRepo.save(newProduct);

        return this.productMapper.fromDomainToResponseDto(createdProduct);
        
    }

}