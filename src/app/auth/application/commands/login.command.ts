// Command used to initiate user login and token generation
export class LoginCommand{
    constructor(
        public readonly userEmail:string,
        public readonly userPassword:string
    ){}
}