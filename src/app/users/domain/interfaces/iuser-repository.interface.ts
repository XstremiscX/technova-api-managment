import { User } from "../entities/user";
import { UserPublicView } from "../../presentations/views/user-public.view";
import { LoginUserView } from "src/app/auth/presentation/views/login-user.view";

export interface IUserRepository{

    save(user: User): Promise<UserPublicView>;

    update(userPublicVewi:UserPublicView): Promise<UserPublicView>;

    findByEmail(emai:string):Promise<LoginUserView>;

    findById(id:string):Promise<UserPublicView>;

    existsByEmail(email:string, excludeUserId?: string):Promise<boolean>;

    softDelete(id:string):Promise<void>;

    updatePassword(id:string, newPassword:string):Promise<void>;

    verifyUserEmail(id:string):Promise<void>;
}