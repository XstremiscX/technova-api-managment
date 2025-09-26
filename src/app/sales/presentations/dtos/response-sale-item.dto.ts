import { Expose, Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class SaleItemResponseDto{

    @Expose()
    @ApiProperty({description:"Sale id", example:"ft34r-123isd-1d32e-123isd"})
    id:string;

    @Expose()
    @ApiProperty({description:"Product purchase amount", example:25000})
    amount:number;

    @Expose()
    @ApiProperty({description:"Sale date", example:"12/06/2002 15:34:22.000 Gmt"})
    date:Date;

    @Expose()
    @ApiProperty({description:"Purchase products quantity", example:12})
    quantity:number;

}