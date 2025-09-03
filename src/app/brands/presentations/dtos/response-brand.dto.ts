import { ApiProperty } from "@nestjs/swagger";

export class BrandResponseDto{

    @ApiProperty({description:"Brand ID", example:"12313-asdf123rfew-2345d"})
    id:string;

    @ApiProperty({description:"Brand Name", example:"ASUS"})
    name:string;

}