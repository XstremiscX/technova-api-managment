import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "../../presentation/controllers/auth.controller";
import * as dotenv from "dotenv";
import { LoginCommandHandler } from "../../application/hanlders/login.handler";
import { VerifyEmailCommandHanlder } from "../../application/hanlders/verify-email.handler";
import { PasswordService } from "src/app/users/infrastructure/services/password.service";
import { TokenService } from "../services/token.service";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "src/app/users/infrastructure/repositories/user.repository";
import { UserMapper } from "src/app/users/presentations/mappers/user.mapper";
import { UsersModule } from "src/app/users/infrastructure/modules/users.module";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthGuard } from "../guards/auth.guard";

dotenv.config()

@Module({
    providers:[
        //Handlers
        LoginCommandHandler,
        VerifyEmailCommandHanlder,

        //PasswordService
        PasswordService,
        
        TokenService,
        AuthGuard,

        {
            provide:"ITokenService",
            useClass: TokenService
        },
        {
            provide:"IAuthService",
            useClass:AuthService
        },
        {
            provide:"IUserRepository",
            useClass:UserRepository
        },

        //Mapper
        UserMapper
        
    ],
    controllers:[AuthController],
    imports:[
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions:{expiresIn:"1h"}
        }),
        UsersModule,
        CqrsModule
    ],
    exports:[
        TokenService,
        AuthGuard
    ]
})
export class AuthModule{

}