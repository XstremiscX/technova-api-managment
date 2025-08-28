import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BrandResponseDto } from "src/app/brands/presentations/dtos/response-brand.dto";
import { CategoryResponseDto } from "src/app/categories/presentations/dtos/response-category.dto";

export class ProductItemResponseDto{

    @Expose()
    @ApiProperty({description:"Product id",example:"1kwg3f-sah32j34-d123"})
    id:string;

    @Expose()
    @ApiProperty({description:"Product name", example:"MSI Dragon Layer"})
    name:String;

    @Expose()
    @ApiProperty({description:"Product Image", example:"https://imagerepository/image.png"})
    image:String;

    @Expose()
    @ApiProperty({description:"Product price", example:34000})
    price:number;

    @Expose()
    @ApiProperty({description:"Product stock", example:60})
    stock:number;

    @Expose()
    @ApiProperty({description:"Product brand", type:()=>BrandResponseDto})
    brand: BrandResponseDto;

    @Expose()
    @ApiProperty({description:"Product category", type:()=>CategoryResponseDto})
    category: CategoryResponseDto;

}