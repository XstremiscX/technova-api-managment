// Domain event triggered after a user is successfully created
export class UserCreatedEvent{
    constructor(
        public readonly userEmail:string, 
        public readonly id:string,
        public readonly name: string,
    ){}
}