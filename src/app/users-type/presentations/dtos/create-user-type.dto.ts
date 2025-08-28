import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserTypeDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"User type name", example:"Admin"})
    name:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"User type description", example:"Role for users responsible for managing the page."})
    description:string;

}