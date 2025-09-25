import { Expose, Exclude, Type } from "class-transformer";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { BrandResponseDto } from "src/app/brands/presentations/dtos/response-brand.dto";
import { CategoryResponseDto } from "src/app/categories/presentations/dtos/response-category.dto";
import { ProductItemResponseDto } from "./response-product-itme.dto";

export class ProductDetailResponseDto{

    @ApiProperty({description:"Product description", example:"Product description"})
    description:string;

    @ApiProperty({description:"Products details", example:"{Ram:12Gb,SSD:500GB}"})
    details:string;

    @ApiProperty({description:"Seller owner id", example:"1kwg3f-sah32j34-d123"})
    seller_id:string;

}
