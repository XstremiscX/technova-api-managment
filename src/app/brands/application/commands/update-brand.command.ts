// Command that receives a new name and ID, to update the brand name.
export class UpdateBrandCommand{
    constructor(
        public readonly newName: string,
        public readonly id: string,
    ){}
}