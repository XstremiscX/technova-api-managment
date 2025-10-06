import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";


// DTO to create a new brand
export class CreateBrandDto{

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @MaxLength(150,{message:"Brand name is too long"})
    @ApiProperty({description:"Brand name", example:"ASUS"})
    name:string;
}
