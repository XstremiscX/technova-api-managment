// This command allows you to update the data for a category.
export class UpdateCategoryCommand{
    // It receives a new name and a new optional description to update, as well as the category ID.
    constructor(
        public readonly id:string,
        public readonly newName:string,
        public readonly newDescription?:string,
    ){}
}