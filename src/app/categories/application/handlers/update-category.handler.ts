import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import type { ICategoryRepository } from "../../domain/interfaces/icategory-repository.interface";
import { Inject } from "@nestjs/common";
import { CategoryMapper } from "../../presentations/mappers/category.mapper";
import { UpdateCategoryCommand } from "../commands/update-category.command";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import { CategoryResponseDto } from "../../presentations/dtos/response-category.dto";


@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand>{

    constructor(
        @Inject("ICategoryRepository") private categoryRepo: ICategoryRepository,
        private mapper: CategoryMapper
    ){}

    async execute(command: UpdateCategoryCommand): Promise<CategoryResponseDto> {
        
        const category = await this.categoryRepo.findById(command.id);
        
        if(category.getName() === command.newName) throw new BussinessError("The new name must be different from the current name.");

        category.rename(command.newName)

        if(command.newDescription) category.changeDescription(command.newDescription);

        const updated = await this.categoryRepo.update(category);

        return this.mapper.toResponseDto(updated);

    }

}