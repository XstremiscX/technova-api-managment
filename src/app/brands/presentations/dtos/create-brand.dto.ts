import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateBrandDto{

    @Transform(({value}) => typeof value === "string" ? value.trim() : value)
    @IsString()
    @IsNotEmpty()
    @MaxLength(100,{message:"Brand name is too long"})
    @ApiProperty({description:"Brand name", example:"ASUS"})
    name:string;

}
