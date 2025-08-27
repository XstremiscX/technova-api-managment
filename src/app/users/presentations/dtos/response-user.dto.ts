import { Exclude, Expose, Type } from "class-transformer";
import { UserTypeResponseDto } from "./response-user-type.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto{

    @Expose()
    @ApiProperty({description:"User ID", example:"1234-34346-fgsdfq345-qew234"})
    id:string;

    @Expose()
    @ApiProperty({description:"User name",example:"Jhon Doe"})
    name:string;

    @Expose()
    @ApiProperty({description:"User email",example:"userexampleemail@gmail.com"})
    email:string;

    @Expose()
    @ApiProperty({description:"User cellphone number",example:"0000000000"})
    phone:string;

    @Expose()
    @ApiProperty({description:"User address",example:"Colombia,Antioquia,Medellín,calle 00,00-00,potalcode"})
    address:string;

    // This element is excluded because it should not be shown to the user for security reasons.
    @Exclude()
    password:string;

    // This statement allows you to display the ID and type of user to which the user belongs.
    @Expose()
    @ApiProperty({description:"User type object", type: ()=>UserTypeResponseDto})
    @Type(()=>UserTypeResponseDto)
    type: UserTypeResponseDto;

    // This element is excluded because it is only necessary to know whether the user deleted or has an active account.
    @Exclude()
    status:boolean;

    // This element is excluded because it only serves to enable future searches in tables for active users and prevent deleted users from logging in.
    @Exclude()
    verified:boolean;

    // This element is excluded because it is only necessary to know when the user registered.
    @Exclude()
    registration_date:string;

}