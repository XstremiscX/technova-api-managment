// Command used to request the deletion of a user by ID
export class DeleteUserCommand{
    constructor(
        public readonly id:string
    ){}
}