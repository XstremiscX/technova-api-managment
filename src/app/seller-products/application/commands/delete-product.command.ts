export class DeleteProductCommand{
    constructor(
        public readonly id:string,
        public readonly seller_id:string
    ){}
}