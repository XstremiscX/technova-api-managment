import { ApiProperty } from "@nestjs/swagger";
import { UserTypeEnum } from "src/app/commons/utils/enums/users-type.enum";

// DTO returned after successful login, containing the JWT token
export class LoginResponseDto{

    @ApiProperty({description:"JSON Web Token", example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"})
    JWT:string;

}