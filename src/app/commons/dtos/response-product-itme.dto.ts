import { ApiProperty } from "@nestjs/swagger";

// DTO representing a summarized product item for listings
export class ProductItemResponseDto{

    @ApiProperty({description:"Product id",example:"1kwg3f-sah32j34-d123"})
    id:string;

    @ApiProperty({description:"Product name", example:"MSI Dragon Layer"})
    name:string;

    @ApiProperty({description:"Product Image", example:"https://imagerepository/image.png"})
    image:string;

    @ApiProperty({description:"Product price", example:34000})
    price:number;

    @ApiProperty({description:"Product stock", example:60})
    stock:number;

    @ApiProperty({description:"Product brand", example:"1kwg3f-sah32j34-d123"})
    brand: string;

    @ApiProperty({description:"Product category", example:"sah32j34-d123-1kwg3"})
    category: string;

}