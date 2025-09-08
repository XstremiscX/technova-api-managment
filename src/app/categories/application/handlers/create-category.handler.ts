import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { CreateCategoryCommand } from "../commands/create-category.command";
import type { ICategoryRepository } from "../../domain/interfaces/icategory-repository.interface";
import { Inject } from "@nestjs/common";
import { Category } from "../../domain/entities/category";
import { v4 as uuid } from 'uuid';
import { CategoryResponseDto } from "../../presentations/dtos/response-category.dto";
import { CategoryMapper } from "../../presentations/mappers/category.mapper";

// Registers this class as the handler for CreateCategoryCommand.
@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand>{

    constructor(
        // Injects the repository implementation via its interface token
        @Inject("ICategoryRepository") private categoryRepo: ICategoryRepository,

        // Mapper used to transform the domain entity into a response DTO
        private mapper: CategoryMapper
    ){}

    async execute(command: CreateCategoryCommand): Promise<CategoryResponseDto> {

        // Creates a new category domain entity using a generated UUID and the name from the command
        const category = new Category(uuid(),command.name,command.description)

        // Persists the new Category using the repository
        const save = await this.categoryRepo.save(category);

        // Maps the saved Brand to a DTO and returns it
        return this.mapper.toResponseDto(save);
        
    }

}