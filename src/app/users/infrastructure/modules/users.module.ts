import { forwardRef, Module } from "@nestjs/common";
import { GetByIdUserHandler } from "../../application/handlers/get-by-id-user.handler";
import { UpdateUserHandler } from "../../application/handlers/update-user.handler";
import { DeleteUserHandler } from "../../application/handlers/delete-user.handler";
import { CreateUserHandler } from "../../application/handlers/create-user.handler";
import { UserRepository } from "../repositories/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { UserController } from "../../presentations/controllers/user.controller";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserMapper } from "../../presentations/mappers/user.mapper";
import { UpdateUserPasswordHandler } from "../../application/handlers/update-user-password.handler";
import { PasswordService } from "../services/password.service";
import { AuthModule } from "src/app/auth/infrastructure/modules/auth.module";
import { UserCreatedEventService } from "../services/user-created-event.service";
import { SendVerificationEmailService } from "src/app/commons/services/send-verification-email.service";
import { UserCreatedEventListener } from "../listeners/user-created-event.listener";

@Module({
    imports:[
        // Registers UserEntity for TypeORM
        TypeOrmModule.forFeature([UserEntity]),
        // Enables CQRS command and query buses
        CqrsModule,
        // Allows circular dependency resolution with AuthModule
        forwardRef(()=>AuthModule)
    ],
    controllers:[UserController],
    providers:[
        // CQRS Handlers
        GetByIdUserHandler,
        UpdateUserHandler,
        DeleteUserHandler,
        CreateUserHandler,
        UpdateUserPasswordHandler,

        // Repository implementation
        {
            provide: "IUserRepository",
            useClass: UserRepository
        },

        // Mapper for transforming entities to views
        UserMapper,

        // Password hashing and validation service
        PasswordService,

        // Event emission and email notification services
        UserCreatedEventService,
        SendVerificationEmailService,
        UserCreatedEventListener
    ],
    exports:[
        TypeOrmModule,
        UserMapper,
        PasswordService
    ]
})
export class UsersModule{}