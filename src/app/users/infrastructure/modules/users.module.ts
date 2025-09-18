import { forwardRef, Module } from "@nestjs/common";
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
import { AuthModule } from "src/app/auth/infrastructure/modules/auth.module";
import { UserCreatedEventService } from "../services/user-created-event.service";
import { SendVerificationEmailService } from "src/app/commons/services/send-verification-email.service";
import { UserCreatedEventListener } from "../listeners/user-created-event.listener";

@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity]),
        CqrsModule,
        forwardRef(()=>AuthModule)
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
        PasswordService,

        //Events services
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