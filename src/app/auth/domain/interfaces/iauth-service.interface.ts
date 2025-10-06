import { LoginUserView } from "../../presentation/views/login-user.view";

// Interface for authentication service
export interface IAuthService{
    validateCredentials(userEmail:string, userPassword:string):Promise<LoginUserView>;
}