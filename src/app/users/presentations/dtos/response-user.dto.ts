import { ApiProperty } from "@nestjs/swagger";
import { UserTypeEnum } from "src/app/commons/utils/enums/users-type.enum";

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

    // This statement allows you to display the ID and type of user to which the user belongs.
    
    @ApiProperty({description:"User type object", example:UserTypeEnum.SELLER})
    type: UserTypeEnum;

}