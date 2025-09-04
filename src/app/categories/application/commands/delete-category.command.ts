// This is the command that allows you to delete a category.
export class DeleteCategoryCommand{
    // This command should receive an ID for the element that needs to be deleted.
    constructor(
        public readonly id:string
    ){}
}