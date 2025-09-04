import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import type { ICategoryRepository } from "../../domain/interfaces/icategory-repository.interface";
import { Inject } from "@nestjs/common";
import { GetAllCategoriesQuery } from "../queries/get-all-categories.query";
import { CategoryResponseDto } from "../../presentations/dtos/response-category.dto";
import { CategoryMapper } from "../../presentations/mappers/category.mapper";

// Registers this class as the handler for the GetAllCategoriesQuery
@QueryHandler(GetAllCategoriesQuery)
export class GetAllCategoriesHandler implements IQueryHandler<GetAllCategoriesQuery>{

    constructor(
        // Injects the repository implementation via its interface token
        @Inject("ICategoryRepository") private categoryRepo: ICategoryRepository,

        // Mapper used to transform domain entities into response DTOs
        private readonly mapper: CategoryMapper
    ){}

    async execute(): Promise<CategoryResponseDto[]> {
        
        // Retrieves all Categories domain entities from the repository
        const categories =  await this.categoryRepo.findAll();

        // Maps each Category entity to a response DTO and returns the full list
        return categories.map((e)=>{return this.mapper.toResponseDto(e)});

    }

}