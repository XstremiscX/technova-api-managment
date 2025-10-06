import { UpdateProductDto } from "../../presentations/dtos/update-product.dto";

// Command representing the intention to update a product's information
export class UpdateProductCommand{
    constructor(
        public readonly id: string,
        public readonly seller_id:string,
        public readonly updateProductDto:UpdateProductDto
    ){}
}