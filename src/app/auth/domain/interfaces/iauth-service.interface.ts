import { LoginUserView } from "../../presentation/views/login-user.view";

export interface IAuthService{
    validateCredentials(userEmail:string, userPassword:string):Promise<LoginUserView>;
}