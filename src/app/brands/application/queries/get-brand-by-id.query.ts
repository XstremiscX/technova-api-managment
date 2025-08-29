export class GetBrandByIdQuery{

    // This query searches by ID, which is why it needs that filter.
    constructor(
        public readonly id:string
    ){}

}