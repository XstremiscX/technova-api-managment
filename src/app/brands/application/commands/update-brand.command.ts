export class UpdateBrandCommand{

    // This command should receive an object of type UpdateBrandDto.
    constructor(
        public readonly newName: string,
        public readonly id: string,
    ){}
}