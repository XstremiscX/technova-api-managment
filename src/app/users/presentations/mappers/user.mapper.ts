import { UserEntity } from "../../domain/entities/user.entity";
import { UserPublicView } from "../views/user-public.view";
import { LoginUserView } from "src/app/auth/presentation/views/login-user.view";

// Mapper for transforming UserEntity into public and login views
export class UserMapper{

    // Maps a UserEntity to a public view used in responses
    toUserPublicViewFromEntity(entity:UserEntity):UserPublicView{

        return new UserPublicView(entity.id,entity.name,entity.phone,entity.email,entity.address);

    }
    
    // Maps a UserEntity to a login view used during authentication
    toLoginUserViewFromEntity(entity:UserEntity):LoginUserView{
        
        return new LoginUserView(entity.id,entity.email,entity.password,entity.type)

    }

}