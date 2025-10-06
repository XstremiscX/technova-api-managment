import { ApiProperty} from "@nestjs/swagger";

// DTO representing detailed product information for seller view
export class ProductDetailResponseDto{

    @ApiProperty({description:"Product description", example:"Product description"})
    description:string;

    @ApiProperty({description:"Products details", example:"{Ram:12Gb,SSD:500GB}"})
    details:string;

    @ApiProperty({description:"Seller owner id", example:"1kwg3f-sah32j34-d123"})
    seller_id:string;

}
