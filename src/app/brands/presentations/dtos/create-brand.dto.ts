import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBrandDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Brand name", example:"ASUS"})
    name:string;

}
