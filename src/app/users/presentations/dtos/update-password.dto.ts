import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger"; // The ApiProperty decorator allows Swagger to identify a property of the input or output data of an endpoint. 

export class UpdatePasswordDto{
    
    @IsString()
    @Transform(({value}) =>  value.trim())
    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty({description:"new user password", example:"newPassword123"})
    newPassword:string;

    @IsString()
    @Transform(({value}) =>  value.trim())
    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty({description:"new user password", example:"newPassword123"})
    confirmPassword:string;

}