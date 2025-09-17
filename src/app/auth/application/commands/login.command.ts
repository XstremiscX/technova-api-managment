export class LoginCommand{
    constructor(
        public readonly userEmail:string,
        public readonly userPassword:string
    ){}
}