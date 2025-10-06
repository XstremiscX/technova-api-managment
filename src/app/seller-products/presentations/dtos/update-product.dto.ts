import { ApiPropertyOptional } from "@nestjs/swagger";
import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import { Min } from "class-validator";

// DTO used to update product information, excluding seller_id
export class UpdateProductDto extends PartialType(OmitType(CreateProductDto,['seller_id'])){

    @ApiPropertyOptional({description:"Product name", example:"Ram 18Gb ddr4"})
    name?:string;

    @ApiPropertyOptional({description:"Image url", example:"https://imageRespository/ram_image.png"})
    image?:string;

    @ApiPropertyOptional({description:"Product description", example:"Example product description"})
    description?:string;

    @Min(0)
    @ApiPropertyOptional({description:"Product price", example:500})
    price?:number;

    @Min(0)
    @ApiPropertyOptional({description:"Product stock", example:20})
    stock?:number;

    @ApiPropertyOptional({description:"Product details", example:"{RamMemory:12GB, SSD:500Gb, Screen:144hz,....}"})
    details?:string;

    @ApiPropertyOptional({description:"Product brand id", example:"123afq3-asdr124-aer134r33"})
    brand?:string;

    @ApiPropertyOptional({description:"Product category id", example:"123afq3-asdr124-aerr33"})
    category?:string;

}