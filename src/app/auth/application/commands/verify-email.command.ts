// Command used to verify a user's email address
export class VerifyEmailCommand{
    constructor(
        public readonly id: string
    ){}
}