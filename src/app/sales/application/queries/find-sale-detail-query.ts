// Query to retrieve detailed information about a specific sale
export class FindSaleDetailQuery{
    constructor(
        public readonly saleId:string
    ){}
}