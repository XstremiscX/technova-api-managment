import { Injectable } from "@nestjs/common";
import { ITokenService } from "../../domain/interfaces/itoken-service.interface";
import { JwtService } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import { UserTypeEnum } from "src/app/commons/utils/enums/users-type.enum";
import { TokenPayloadDto } from "../../presentation/dtos/token-payload.dto";

dotenv.config()

@Injectable()
export class TokenService implements ITokenService{

    private readonly secret = process.env.JWT_SECRET;

    constructor(
        private readonly jwtService: JwtService
    ){}

    generateToken(id: string, email: string, type: number): string {

        const payload = {
            userId:id,
            userEmail:email,
            userType: UserTypeEnum[type]
        }
        
        const token = this.jwtService.sign(payload)

        return token;

    }

    verifyToken(token: string):TokenPayloadDto{

        return this.jwtService.verify(token)

    }

}