// Query to retrieve all sales for a specific user (buyer or seller)
export class FindAllSalesQuery{
    constructor(
        public readonly userId:string,
        public readonly userType:string
    ){}
}