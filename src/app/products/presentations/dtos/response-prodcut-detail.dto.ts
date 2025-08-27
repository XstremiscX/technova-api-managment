import { Expose, Exclude, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BrandResponseDto } from "src/app/brands/presentations/dtos/response-brand.dto";
import { CategoryResponseDto } from "src/app/categories/presentations/dtos/response-category.dto";

export class ProductDetailResponseDto{

    @Expose()
    @ApiProperty({description:"Product Id", example:"1kwg3f-sah32j34-d123"})
    id:string;

    @Expose()
    @ApiProperty({description:"Product name", example:"MSI PC Dragon Style"})
    name:string;

    @Expose()
    @ApiProperty({description:"Product image url", example:"https://imagerepositorie/product_image.png"})
    image:string;

    @Expose()
    @ApiProperty({description:"Product description", example:"Product description"})
    description:string;

    @Expose()
    @ApiProperty({description:"Product price", example:120000})
    price:number;

    @Expose()
    @ApiProperty({description:"Product stock", example:60})
    stock:number;

    @Expose()
    @ApiProperty({description:"Products details", example:"{Ram:12Gb,SSD:500GB}"})
    details:string;

    @Exclude()
    status: number;

    @Exclude()
    createdAt:Date;

    @Expose()
    @ApiProperty({description:"Brand object response", type: ()=>BrandResponseDto})
    @Type(()=>BrandResponseDto)
    brand:BrandResponseDto;

    @Expose()
    @ApiProperty({description:"Category object resposne", type: ()=>CategoryResponseDto})
    @Type(()=>CategoryResponseDto)
    category:CategoryResponseDto;

    @Expose()
    @ApiProperty({description:"Seller owner id", example:"1kwg3f-sah32j34-d123"})
    seller_id:string;

}
