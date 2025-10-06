import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import type { ICategoryRepository } from "../../domain/interfaces/icategory-repository.interface";
import { Inject } from "@nestjs/common";
import { CategoryMapper } from "../../presentations/mappers/category.mapper";
import { UpdateCategoryCommand } from "../commands/update-category.command";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import { CategoryResponseDto } from "../../presentations/dtos/response-category.dto";
import { Category } from "../../domain/entities/category";

// Registers this class as the handler for UpdateCategoryCommand in the CQRS flow
@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {

    constructor(
        // Injects the repository implementation via its interface token
        @Inject("ICategoryRepository") private categoryRepo: ICategoryRepository,
        
        // Mapper used to convert the domain entity into a response DTO
        private mapper: CategoryMapper
    ) {}

    async execute(command: UpdateCategoryCommand): Promise<CategoryResponseDto> {
        // Retrieves the Category domain entity by ID using the repository
        const categoryToUpdate = await this.categoryRepo.findById(command.id);    

        if(command.newName) categoryToUpdate.rename(command.newName);
        
        if(command.newDescription) categoryToUpdate.changeDescription(command.newDescription);

        // Persists the updated Category entity using the repository
        const updated = await this.categoryRepo.update(categoryToUpdate);

        // Maps the updated entity to a DTO and returns it
        return this.mapper.toResponseDtoFromDomain(updated);
    }

}
