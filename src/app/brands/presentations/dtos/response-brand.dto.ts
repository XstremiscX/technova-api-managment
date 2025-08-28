import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class BrandResponseDto{

    @Expose()
    @ApiProperty({description:"Brand ID", example:"12313-asdf123rfew-2345d"})
    id:string;

    @Expose()
    @ApiProperty({description:"Brand Name", example:"ASUS"})
    name:string;

}