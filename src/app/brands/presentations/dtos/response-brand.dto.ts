import { ApiProperty } from "@nestjs/swagger";

// Response DTO indicating how and what is expected to be received when querying a brand
export class BrandResponseDto{

    // Unique brand identifier
    @ApiProperty({description:"Brand ID", example:"12313-asdf123rfew-2345d"})
    id:string;

    // Brand name
    @ApiProperty({description:"Brand Name", example:"ASUS"})
    name:string;

}