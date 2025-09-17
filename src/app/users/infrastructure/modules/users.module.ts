import { Module } from "@nestjs/common";
import { GetByIdUserQueryHandler } from "../../application/handlers/get-by-id-user-query.handler";
import { UpdateUserCommandHandler } from "../../application/handlers/update-user-command.handler";
import { DeleteUserCommandHandler } from "../../application/handlers/delete-user-command.handler";
import { CreateUserCommandHandler } from "../../application/handlers/create-user-command.handler";
import { UserRepository } from "../repositories/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { UserController } from "../../presentations/controllers/user.controller";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserMapper } from "../../presentations/mappers/user.mapper";
import { UpdateUserPasswordCommandHandler } from "../../application/handlers/update-user-password-command.handler";
import { PasswordService } from "../services/password.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity]),
        CqrsModule
    ],
    controllers:[UserController],
    providers:[
        // Handlers
        GetByIdUserQueryHandler,
        UpdateUserCommandHandler,
        DeleteUserCommandHandler,
        CreateUserCommandHandler,
        UpdateUserPasswordCommandHandler,

        //Repository
        {
            provide: "IUserRepository",
            useClass: UserRepository
        },

        // Mapper
        UserMapper,

        // ServicesP
        PasswordService
    ],
    exports:[
        TypeOrmModule,
        UserMapper,
        PasswordService
    ]
})
export class UsersModule{}