import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDto } from "./create-category.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

// DTO that inherits from CreateCategoryDto to update the category
export class UpdateCategoryDto extends PartialType(CreateCategoryDto){

    @ApiPropertyOptional({description:"Category name", example:"RAM"})
    name?:string;

    @ApiPropertyOptional({description:"Category description", example:"Example description"})
    description?: string;

}