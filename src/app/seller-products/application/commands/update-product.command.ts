import { UpdateProductDto } from "../../presentations/dtos/update-product.dto";

export class UpdateProductCommand{
    constructor(
        public readonly id: string,
        public readonly seller_id:string,
        public readonly updateProductDto:UpdateProductDto
    ){}
}