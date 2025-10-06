// Query to retrieve all products for a specific seller
export class FindAllProductsQuery{
    constructor(
        public readonly seller_id:string
    ){}
}