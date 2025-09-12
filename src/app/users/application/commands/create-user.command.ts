import { UserTypeEnum } from "src/app/commons/utils/enums/users-type.enum";

// Command used to initiate the creation of a new user.
export class CreateUserCommand{
    constructor(
        public readonly name:string,
        public readonly email:string,
        public readonly phone:string,
        public readonly password:string,
        public readonly type:UserTypeEnum,
        public readonly address:string,
    ){}
}