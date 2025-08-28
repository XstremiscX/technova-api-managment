import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"; // The ApiProperty decorator allows Swagger to identify a property of the input or output data of an endpoint. 

export class UpdatePasswordDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"current password", example:"currentPassword123"})
    current_password:string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"new user password", example:"newPassword123"})
    new_password:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"confirm new password", example:"newPassword123"})
    confirm_password:string;
}