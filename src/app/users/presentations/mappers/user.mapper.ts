import { BaseMapper } from "src/app/commons/mappers/base.mapper";
import { User } from "../../domain/entities/user";
import { UserResponseDto } from "../dtos/response-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { LoginPayloadResponseDto } from "../dtos/response-login-payload.dto";
import { UserPublicView } from "../views/user-public.view";

export class UserMapper{

    toUserPublicViewFromEntity(entity:UserEntity):UserPublicView{

        return new UserPublicView(entity.id,entity.name,entity.phone,entity.email,entity.address);

    }

    toLoginPayloadFromEntity(entity: UserEntity): LoginPayloadResponseDto {
        return {
            id: entity.id,
            email: entity.email,
            type: entity.type
        }
    }

}