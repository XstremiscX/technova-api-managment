
import { UserEntity } from "../../domain/entities/user.entity";
import { LoginResponseDto } from "../../../auth/presentation/dtos/response-login.dto";
import { UserPublicView } from "../views/user-public.view";

export class UserMapper{

    toUserPublicViewFromEntity(entity:UserEntity):UserPublicView{

        return new UserPublicView(entity.id,entity.name,entity.phone,entity.email,entity.address);

    }

}