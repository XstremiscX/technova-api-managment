import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { CreateProductCommand } from "../commands/create-product.command";
import { Inject } from "@nestjs/common";
import type { ISellerProductRepository } from "../../domain/interfaces/iseller-product-repository.interface";
import { ProductMapper } from "../../../commons/mappers/seller-products.mapper";
import { ProductItemResponseDto } from "../../../commons/dtos/response-product-itme.dto";
import { Product } from "../../../commons/domain/entitites/product";
import {v4 as uuid} from 'uuid';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand>{

    constructor(
        @Inject("ISellerProductRepository") private readonly productRepo: ISellerProductRepository<Product>,
        private readonly productMapper: ProductMapper
    ){}

    async execute(command: CreateProductCommand): Promise<ProductItemResponseDto> {

        const newProduct = new Product(
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