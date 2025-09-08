import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { UserTypeResponseDto } from "../../../users-type/presentations/dtos/response-user-type.dto";

export class LoginPayloadResponseDto{

    @ApiProperty({description:"User ID", example:"1234-34346-fgsdfq345-qew234"})
    id:string;

    @ApiProperty({description:"User email", example:"useremailexample@gmail.com"})
    email:string;

    @ApiProperty({description:"User type", type: ()=> UserTypeResponseDto})
    @Type(()=>UserTypeResponseDto)
    type: UserTypeResponseDto;

}