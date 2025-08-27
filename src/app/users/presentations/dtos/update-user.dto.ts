import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from "./create-user.dto";

// This class inherits from the CreateUserDto class but omits the password attribute, as this must be updated independently.
export class UpdateUserDto extends OmitType(CreateUserDto,["password"]){


}