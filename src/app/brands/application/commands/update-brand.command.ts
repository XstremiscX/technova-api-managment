// This command allows you to update the data for a category.
export class UpdateBrandCommand{
    // Receive a new name to update and the brand ID.
    constructor(
        public readonly newName: string,
        public readonly id: string,
    ){}
}