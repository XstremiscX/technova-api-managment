// Command that receives a name to create a new brand.
export class CreateBrandCommand{
    constructor(
        public readonly name: string
    ){}
}