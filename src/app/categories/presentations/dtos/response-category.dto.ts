import { ApiProperty } from "@nestjs/swagger";

export class CategoryResponseDto{

    @ApiProperty({description:"Category id", example:"123kl-43wder12-af234sf-asdf4"})
    id:string;

    @ApiProperty({description:"Category name", example:"PC"})
    name:string;
    
}