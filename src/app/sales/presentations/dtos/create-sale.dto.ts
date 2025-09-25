import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSaleDto{

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description:"Sale amount", example:500000})
    amount:number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description:"Product purchase quantity", example:12})
    quantity:number;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Buyer id", example:"1k23je-123isd-1d32e-ft34r"})
    buyer:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Seller id", example:"1d32e-ft34r-1k23je-123isd"})
    seller:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Sale products details", example:"[{product:{id:'123sad12-123sad',price:23000,name:'MSI Dragon design'},quantity:2}]"})
    details:string;

}