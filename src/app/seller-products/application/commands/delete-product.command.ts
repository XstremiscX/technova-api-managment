// Command representing the intention to soft-delete a product by its seller
export class DeleteProductCommand{
    constructor(
        public readonly id:string,
        public readonly seller_id:string
    ){}
}