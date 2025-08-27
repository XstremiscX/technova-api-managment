import {IsString, IsNotEmpty, IsEmail, IsPhoneNumber} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // The ApiProperty decorator allows Swagger to identify a property of the input or output data of an endpoint. 

export class CreateUserDto{
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"user name", example:"Jhon Doe"})
    name:string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description:"user email", example:"exampleemail@gmail.com"})
    email:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"current password", example:"currentPassword123"})
    password:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"user type id", example:"123s-1r32r-asdq2-das435"})
    type:string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    @ApiProperty({description:"user cellphone number", example:"0000000000"})
    phone:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"user address", example: "Colombia,Antioquia,Medellín,calle 00, 00-00,postalcode"})
    address: string;
}