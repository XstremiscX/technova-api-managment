// Command thath receives an id to delete a brand
export class DeleteBrandCommand{
    // This command should receive an ID for the element that needs to be deleted.
    constructor(
        public readonly id:string
    ){}
}