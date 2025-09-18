export class UserCreatedEvent{
    constructor(
        public readonly userEmail:string, 
        public readonly id:string,
        public readonly name: string,
    ){}
}