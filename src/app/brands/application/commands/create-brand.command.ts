export class CreateBrandCommand{

    // This command should receive an object of type CreateBrandDto.
    constructor(
        public readonly name: string
    ){}
}