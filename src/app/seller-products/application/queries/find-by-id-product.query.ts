// Query to retrieve a product by its ID
export class FindByIdProductQuery{
    constructor(
        public readonly id:string
    ){}
}