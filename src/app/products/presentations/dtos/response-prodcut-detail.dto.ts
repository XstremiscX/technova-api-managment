import { Expose, Exclude, Type } from "class-transformer";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { BrandResponseDto } from "src/app/brands/presentations/dtos/response-brand.dto";
import { CategoryResponseDto } from "src/app/categories/presentations/dtos/response-category.dto";
import { ProductItemResponseDto } from "./response-product-itme.dto";

export class ProductDetailResponseDto extends PartialType(ProductItemResponseDto){

    @Expose()
    @ApiProperty({description:"Product description", example:"Product description"})
    description:string;

    @Expose()
    @ApiProperty({description:"Products details", example:"{Ram:12Gb,SSD:500GB}"})
    details:string;

    @Exclude()
    status: number;

    @Exclude()
    createdAt:Date;

    @Expose()
    @ApiProperty({description:"Category object resposne", type: ()=>CategoryResponseDto})
    @Type(()=>CategoryResponseDto)
    category:CategoryResponseDto;

    @Expose()
    @ApiProperty({description:"Seller owner id", example:"1kwg3f-sah32j34-d123"})
    seller_id:string;

}
