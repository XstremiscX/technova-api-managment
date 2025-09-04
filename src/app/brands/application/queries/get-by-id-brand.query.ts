// This query allows you to obtain information about a specific brand.
export class GetBrandByIdQuery{

    // Receive the ID of the brand you are going to search for.
    constructor(
        public readonly id:string
    ){}

}