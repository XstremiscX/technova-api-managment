// Command used to update a user's password
export class UpdateUserPasswordCommand{
    constructor(
        public readonly id:string,
        public readonly newPassword:string,
        public readonly confirmPassword:string
    ){}
}