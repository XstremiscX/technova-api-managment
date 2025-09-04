// This is the command that allows you to create a new brand.
export class CreateBrandCommand{
    // Receive a name as parameter.
    constructor(
        public readonly name: string
    ){}
}