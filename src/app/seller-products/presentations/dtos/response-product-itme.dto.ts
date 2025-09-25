import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BrandResponseDto } from "src/app/brands/presentations/dtos/response-brand.dto";
import { CategoryResponseDto } from "src/app/categories/presentations/dtos/response-category.dto";

export class ProductItemResponseDto{

    @ApiProperty({description:"Product id",example:"1kwg3f-sah32j34-d123"})
    id:string;

    @ApiProperty({description:"Product name", example:"MSI Dragon Layer"})
    name:String;

    @ApiProperty({description:"Product Image", example:"https://imagerepository/image.png"})
    image:String;

    @ApiProperty({description:"Product price", example:34000})
    price:number;

    @ApiProperty({description:"Product stock", example:60})
    stock:number;

    @ApiProperty({description:"Product brand", example:"1kwg3f-sah32j34-d123"})
    brand: string;

    @ApiProperty({description:"Product category", example:"sah32j34-d123-1kwg3"})
    category: string;

}