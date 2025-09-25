import {IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, MinLength, IsStrongPassword, IsInt} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // The ApiProperty decorator allows Swagger to identify a property of the input or output data of an endpoint. 
import { UserTypeEnum } from 'src/app/commons/utils/enums/users-type.enum';
import { Transform } from 'class-transformer';

export class UpdateUserDto{
    
    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"user name", example:"Jhon Doe"})
    @IsOptional()
    name?:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description:"user email", example:"exampleemail@gmail.com"})
    @IsOptional()
    email?:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    @ApiProperty({description:"user cellphone number", example:"0000000000"})
    @IsOptional()
    phone?:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"user address", example: "Colombia,Antioquia,Medellín,calle 00, 00-00,postalcode"})
    @IsOptional()
    address?: string;

}