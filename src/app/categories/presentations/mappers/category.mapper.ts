import { BaseMapper } from "src/app/commons/mappers/base.mapper";
import { Category } from "../../domain/entities/category";
import { CategoryResponseDto } from "../dtos/response-category.dto";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class CategoryMapper extends BaseMapper<Category,CategoryResponseDto,CategoryEntity>{

    toResponseDtoFromEntity(categoryEntity: CategoryEntity): CategoryResponseDto {

        return {id: categoryEntity.id, name: categoryEntity.name, description: categoryEntity.description};

    }

    toResponseDtoFromDomain(category: Category): CategoryResponseDto {
        return {id: category.id, name: category.getName(), description: category.getDescription()};

    }

    toDomainFromEntity(categoryEntity: CategoryEntity): Category {

        return new Category(categoryEntity.id,categoryEntity.name,categoryEntity.description);

    }

    toEntityFromDomain(category: Category): CategoryEntity {
        const entity = new CategoryEntity();
        entity.id = category.id;
        entity.name = category.getName();
        entity.description = category.getDescription();
        return entity;
    }

}