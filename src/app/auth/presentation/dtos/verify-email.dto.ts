import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

// DTO used to verify a user's email via their unique ID
export class VerifyEmailDto{
    
    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"User ID for verification", example:"12j32-sda34-2ewfr-4trw"})
    id:string
}