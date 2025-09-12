// Query that obtains information about a brand with the provided ID
export class GetBrandByIdQuery{
    constructor(
        public readonly id:string
    ){}
}