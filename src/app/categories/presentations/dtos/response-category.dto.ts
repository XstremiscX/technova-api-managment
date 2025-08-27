import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryResponseDto{

    @Expose()
    @ApiProperty({description:"Category id", example:"123kl-43wder12-af234sf-asdf4"})
    id:string;

    @Expose()
    @ApiProperty({description:"Category name", example:"PC"})
    name:string;

    @Exclude()
    description:string;
    
}