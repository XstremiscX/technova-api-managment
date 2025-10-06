import {IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, MinLength, IsStrongPassword, IsInt} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // The ApiProperty decorator allows Swagger to identify a property of the input or output data of an endpoint. 
import { UserTypeEnum } from 'src/app/commons/utils/enums/users-type.enum';
import { Transform } from 'class-transformer';

// DTO used to create a new user with validation and Swagger documentation
export class CreateUserDto{
    
    // User's full name
    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"user name", example:"Jhon Doe"})
    name:string;

    // User's email address
    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description:"user email", example:"exampleemail@gmail.com"})
    email:string;
    
    // User's password (must be strong and at least 12 characters)
    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @MinLength(12)
    @IsStrongPassword()
    @ApiProperty({description:"current password", example:"currentPassword123"})
    password:string;

    // User type (e.g., ADMIN=1, SELLER=2, BUYER=3)
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({description:"user type id", example:UserTypeEnum.ADMIN})
    type:UserTypeEnum;

    // User's phone number
    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    @ApiProperty({description:"user cellphone number", example:"0000000000"})
    phone:string;

    // User's physical address
    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"user address", example: "Colombia,Antioquia,Medellín,calle 00, 00-00,postalcode"})
    address: string;
}