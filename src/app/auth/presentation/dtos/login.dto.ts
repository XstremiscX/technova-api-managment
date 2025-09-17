import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    
    @IsString()
    @Transform(({value}) => {return value.trim()})
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description:"User email", example:"example@email.com"})
    userEmail: string;

    @IsString()
    @Transform(({value})=>{return value.trim()})
    @IsNotEmpty()
    @ApiProperty({description:"User password", example:"password123"})
    userPassword: string;

}