import { BaseMapper } from "src/app/commons/mappers/base.mapper";
import { User } from "../../domain/entities/user";
import { UserResponseDto } from "../dtos/response-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";

export class UserMapper implements BaseMapper<User,UserResponseDto,UserEntity>{

    toResponseDtoFromDomain(user: User): UserResponseDto {
        return{ 
            id:user.id, 
            name:user.getName(), 
            email:user.getEmail(), 
            phone:user.getPhoneNumber(), 
            address:user.getAddress() || "", 
            type:user.getType()
        }        
    }

    toResponseDtoFromEntity(entity: UserEntity): UserResponseDto {
        return{
            id: entity.id,
            name: entity.name,
            email: entity.email,
            phone: entity.phone,
            address: entity.address,
            type: entity.type
        }
    }

}