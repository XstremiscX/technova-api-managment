import { Expose, Exclude } from "class-transformer";
import { SaleItemResponse } from "./response-sale-item.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class SaleDetailsResponseDto extends PartialType(SaleItemResponse){

    @Expose()
    @ApiProperty({description:"Buyer id", example:"12jis67-12edsad-123rew"})
    buyer:string;

    @Expose()
    @ApiProperty({description:"Seller id", example:"12jis67-123rew-12edsad"})
    seller:string;

    @Expose()
    @ApiProperty({description:"Sale details", example:"[{product:{id:'123sad12-123sad',price:23000,name:'MSI Dragon design'},quantity:2}]"})
    details:string;

}