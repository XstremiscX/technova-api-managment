import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class UpdateProductDto{

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Product name", example:"Ram 18Gb ddr4"})
    @IsOptional()
    name?:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Image url", example:"https://imageRespository/ram_image.png"})
    @IsOptional()
    image?:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Product description", example:"Example product description"})
    @IsOptional()
    description?:string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description:"Product price", example:500})
    @IsOptional()
    price?:number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description:"Product stock", example:20})
    @IsOptional()
    stock?:number;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Product details", example:"{RamMemory:12GB, SSD:500Gb, Screen:144hz,....}"})
    @IsOptional()
    details?:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Product brand id", example:"123afq3-asdr124-aer134r33"})
    @IsOptional()
    brand?:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Product category id", example:"123afq3-asdr124-aerr33"})
    @IsOptional()
    category?:string;

}