import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// DTO used for user login input validation
export class LoginDto{
    
    // User's email address
    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description:"User email", example:"example@email.com"})
    userEmail: string;

    // User's password
    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"User password", example:"password123"})
    userPassword: string;

}