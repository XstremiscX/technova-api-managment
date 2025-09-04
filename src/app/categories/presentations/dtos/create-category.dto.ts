import { IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto{
    
    @IsString()
    @Transform(({value})=>{return value.trim()})
    @IsNotEmpty()
    @ApiProperty({description:"Category Id", example:"123-asr2314-aer132-s113sq"})
    name:string;

    @IsString()
    @Transform(({value})=>{return value.trim()})
    @IsNotEmpty()
    @ApiProperty({description:"Category description", example:"Example description"})
    description:string;
}