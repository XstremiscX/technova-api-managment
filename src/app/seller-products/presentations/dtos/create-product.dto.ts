import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

// DTO used to create a product and validate input data
export class CreateProductDto{

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Product name", example:"Ram 18Gb ddr4"})
    name:string;
    
    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Image url", example:"https://imageRespository/ram_image.png"})
    image:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Product description", example:"Example product description"})
    description:string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @ApiProperty({description:"Product price", example:500})
    price:number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @ApiProperty({description:"Product stock", example:20})
    stock:number;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Product details", example:"{RamMemory:12GB, SSD:500Gb, Screen:144hz,....}"})
    details:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Product brand id", example:"123afq3-asdr124-aer134r33"})
    brand:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Product category id", example:"123afq3-asdr124-aerr33"})
    category:string;

    @Transform(({value})=>{return typeof value == "string"? value.trim():value})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"Product seller id", example:"123afq3-as124-aer134r33"})
    seller_id:string;

}