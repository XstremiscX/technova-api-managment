import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import type { ICategoryRepository } from "../../domain/interfaces/icategory-repository.interface";
import { Category } from "../../domain/entities/category";
import { CategoryMapper } from "../../presentations/mappers/category.mapper";
import { Inject } from "@nestjs/common";
import { CategoryResponseDto } from "../../presentations/dtos/response-category.dto";
import { GetByIdCategoryQuery } from "../queries/get-by-id-categories.query";

// Registers this class as the handler for GetByIdCategoryQuery in the CQRS flow
@QueryHandler(GetByIdCategoryQuery)
export class GetByIdCategoryHandler implements IQueryHandler<GetByIdCategoryQuery> {

    constructor(
        // Injects the repository implementation via its interface token
        @Inject("ICategoryRepository") private categoryRepo: ICategoryRepository,

        // Mapper used to convert the domain entity into a response DTO
        private readonly mapper: CategoryMapper
    ) {}

    async execute(query: GetByIdCategoryQuery): Promise<CategoryResponseDto> {
        // Retrieves the Category domain entity by ID using the repository
        const category = await this.categoryRepo.findById(query.id);

        // Maps the domain entity to a DTO and returns it
        return this.mapper.toResponseDtoFromDomain(category);
    }
}
