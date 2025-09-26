import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class FiltersDto{

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @ApiProperty({description:"Filter by seller id.", example:"123afq3-asdr124-aer134r33"})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    sellerId?:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @ApiProperty({description:"Filter by category id",example:"123afq3-asdr124-aer134r33"})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    categoryId?:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @ApiProperty({description:"Filter by brand id", example:"123afq3-asdr124-aer134r33"})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    brandId?:string;

    @ApiProperty({description:"Filter by minimum price.",example:230000})
    @Transform(({value})=>{return typeof value == "string"? Number(value):value})
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    minPrice?:number;

    @ApiProperty({description:"Filter by maximum price.",example:460000})
    @Transform(({value})=>{return typeof value == "string"? Number(value):value})
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    maxPrice?:number;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @ApiProperty({description:"Filter by product name.", example:"ASUS ROG"})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?:string;

}