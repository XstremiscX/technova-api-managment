import { Exclude, Expose, Type } from "class-transformer";
import { UserTypeResponseDto } from "../../../users-type/presentations/dtos/response-user-type.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto{

    @ApiProperty({description:"User ID", example:"1234-34346-fgsdfq345-qew234"})
    id:string;

    @ApiProperty({description:"User name",example:"Jhon Doe"})
    name:string;

    @ApiProperty({description:"User email",example:"userexampleemail@gmail.com"})
    email:string;

    @ApiProperty({description:"User cellphone number",example:"0000000000"})
    phone:string;

    @ApiProperty({description:"User address",example:"Colombia,Antioquia,Medellín,calle 00,00-00,potalcode"})
    address:string;

    @ApiProperty({description:"User type object", type: ()=>UserTypeResponseDto})
    @Type(()=>UserTypeResponseDto)
    type: UserTypeResponseDto;

}