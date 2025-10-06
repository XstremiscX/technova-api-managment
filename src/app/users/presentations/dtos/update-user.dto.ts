import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// DTO used to update user information, excluding password
export class UpdateUserDto extends OmitType(CreateUserDto,['password','type']){
}