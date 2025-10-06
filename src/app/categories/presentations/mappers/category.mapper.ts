import { BaseMapper } from "src/app/commons/mappers/base.mapper";
import { Category } from "../../domain/entities/category";
import { CategoryResponseDto } from "../dtos/response-category.dto";
import { CategoryEntity } from "../../domain/entities/category.entity";

// Mapper for transforming between Category domain model, persistence entity, and response DTO
export class CategoryMapper extends BaseMapper<Category,CategoryResponseDto,CategoryEntity>{

    // Maps a domain Category to a response DTO for presentation layer
    toResponseDtoFromDomain(category: Category): CategoryResponseDto {
        return {
            id: category.id, 
            name: category.getName(), 
            description: category.getDescription() ?? "No description"
        };
    }

    // Maps a persistence entity to a domain Category
    toDomainFromEntity(categoryEntity: CategoryEntity): Category {

        return new Category(
            categoryEntity.id,
            categoryEntity.name,
            categoryEntity.description
        );

    }

    // Maps a domain Category to a persistence entity for database operations
    toEntityFromDomain(category: Category): CategoryEntity {
        const entity = new CategoryEntity();
        entity.id = category.id;
        entity.name = category.getName();
        entity.description = category.getDescription();
        return entity;
    }

}