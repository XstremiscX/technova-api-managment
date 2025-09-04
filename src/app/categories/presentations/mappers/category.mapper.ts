import { BaseMapper } from "src/app/commons/mappers/base.mapper";
import { Category } from "../../domain/entities/category";
import { CategoryResponseDto } from "../dtos/response-category.dto";

export class CategoryMapper extends BaseMapper<Category,CategoryResponseDto>{

    toResponseDto(object: Category): CategoryResponseDto {
        
        return {id: object._id, name: object.getName()}

    }

}