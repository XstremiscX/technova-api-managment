import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import type { ISellerProductRepository } from "../../domain/interfaces/iseller-product-repository.interface";
import { ProductMapper } from "../../../commons/mappers/products.mapper";
import { UpdateProductCommand } from "../commands/update-product.command";
import { ProductItemResponseDto } from "../../../commons/dtos/response-product-itme.dto";
import { Product } from "../../../commons/domain/entitites/product";

// Handler for UpdateProductCommand: updates product fields and returns updated summary
@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand>{

    constructor(
        @Inject("ISellerProductRepository") private readonly productRepository: ISellerProductRepository<Product>,
        private readonly productMapper: ProductMapper
    ){}

    async execute(command: UpdateProductCommand): Promise<ProductItemResponseDto> {
        
        const product = await this.productRepository.findById(command.id);
        
        if(command.updateProductDto.name) product.changeName(command.updateProductDto.name);
        if(command.updateProductDto.image )product.changeImage(command.updateProductDto.image);
        if(command.updateProductDto.description) product.changeDescription(command.updateProductDto.description);
        if(command.updateProductDto.price) product.changePrice(command.updateProductDto.price);
        if(command.updateProductDto.stock) product.changeStock(command.updateProductDto.stock);
        if(command.updateProductDto.details) product.changeDetails(command.updateProductDto.details);
        if(command.updateProductDto.brand) product.changeBrand(command.updateProductDto.brand);
        if(command.updateProductDto.category) product.changeCategory(command.updateProductDto.category);
        
        const updatedProdcut = await this.productRepository.update(product);

        return this.productMapper.fromDomainToResponseDto(updatedProdcut);

    }

}