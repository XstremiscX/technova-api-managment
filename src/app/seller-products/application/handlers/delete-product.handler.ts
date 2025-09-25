import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { DeleteProductCommand } from "../commands/delete-product.command";
import { Inject } from "@nestjs/common";
import type { ISellerProductRepository } from "../../domain/interfaces/iseller-product-repository.interface";
import { DeleteResponseDto } from "src/app/commons/utils/response-deleted-domain.dto";
import { DeletedResult } from "src/app/commons/utils/enums/deleted-resutls.enum";
import { SellerProduct } from "../../domain/entities/seller-product";

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand>{

    constructor(
        @Inject("ISellerProductRepository") private readonly productRepository:ISellerProductRepository<SellerProduct>
    ){}

    async execute(command: DeleteProductCommand): Promise<DeleteResponseDto> {
        
       await this.productRepository.softDelete(command.id,command.seller_id);

       return {result: DeletedResult.DELETED, message:"Product Deleted Successfully."}

    }

}