import { IBaseRepository } from "src/app/commons/interfaces/ibase-repository";
import { User } from "../entities/user";
import { UserResponseDto } from "../../presentations/dtos/response-user.dto";

export interface IUserRepository extends IBaseRepository<User,UserResponseDto>{

}