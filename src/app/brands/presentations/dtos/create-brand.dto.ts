import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateBrandDto{

    
    @IsString()
    @Transform(({value})=>{return value.trim()})
    @IsNotEmpty()
    @MaxLength(50,{message:"Brand name is too long"})
    @ApiProperty({description:"Brand name", example:"ASUS"})
    name:string;

}
