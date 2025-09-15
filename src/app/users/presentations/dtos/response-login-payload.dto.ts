import { ApiProperty } from "@nestjs/swagger";
import { UserTypeEnum } from "src/app/commons/utils/enums/users-type.enum";

export class LoginPayloadResponseDto{

    @ApiProperty({description:"User ID", example:"1234-34346-fgsdfq345-qew234"})
    id:string;

    @ApiProperty({description:"User email", example:"useremailexample@gmail.com"})
    email:string;

    @ApiProperty({description:"User type", example: UserTypeEnum.ADMIN})
    type: UserTypeEnum;

}