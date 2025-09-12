import { User } from "../entities/user";
import { UserPublicView } from "../../presentations/views/user-public.view";

export interface IUserRepository{

    save(user: User): Promise<UserPublicView>;

    update(userPublicVewi:UserPublicView): Promise<UserPublicView>;

    findById(id:string):Promise<UserPublicView>;

    existsByEmail(email:string, excludeUserId?: string):Promise<boolean>;

    softDelete(id:string):Promise<void>;

    updatePassword(id:string, newPassword:string):Promise<void>;
}