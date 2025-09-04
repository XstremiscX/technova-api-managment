// This is the command that allows you to create a new category.
export class CreateCategoryCommand{
    // Receive a name and description as parameters.
    constructor(
        public readonly name:string,
        public readonly description:string
    ){}
}