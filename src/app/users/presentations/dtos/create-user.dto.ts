import {IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, MinLength, IsStrongPassword, IsEnum, IsInt} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // The ApiProperty decorator allows Swagger to identify a property of the input or output data of an endpoint. 
import { UserTypeEnum } from 'src/app/commons/utils/enums/users-type.enum';
import { Transform } from 'class-transformer';

export class CreateUserDto{
    
    @IsString()
    @Transform(({value}) =>  value.trim())
    @IsNotEmpty()
    @ApiProperty({description:"user name", example:"Jhon Doe"})
    name:string;

    @IsString()
    @Transform(({value}) =>  value.trim())
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description:"user email", example:"exampleemail@gmail.com"})
    email:string;

    @IsString()
    @Transform(({value}) =>  value.trim())
    @IsNotEmpty()
    @MinLength(12)
    @IsStrongPassword()
    @ApiProperty({description:"current password", example:"currentPassword123"})
    password:string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty({description:"user type id", example:UserTypeEnum.ADMIN})
    type:UserTypeEnum;

    @IsString()
    @Transform(({value}) =>  value.trim())
    @IsNotEmpty()
    @IsPhoneNumber()
    @ApiProperty({description:"user cellphone number", example:"0000000000"})
    phone:string;

    @IsString()
    @Transform(({value}) =>  value.trim())
    @IsNotEmpty()
    @ApiProperty({description:"user address", example: "Colombia,Antioquia,Medellín,calle 00, 00-00,postalcode"})
    address: string;
}