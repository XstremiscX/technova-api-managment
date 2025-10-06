import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import type { ICategoryRepository } from "../../domain/interfaces/icategory-repository.interface";
import { CategoryMapper } from "../../presentations/mappers/category.mapper";
import { DeleteCategoryCommand } from "../commands/delete-category.command";
import { Inject } from "@nestjs/common";
import { DeleteResponseDto } from "src/app/commons/dtos/response-deleted-domain.dto";
import { DeletedResult } from "src/app/commons/utils/enums/deleted-resutls.enum";

// Registers this class as the handler for the DeleteCategoryCommand
@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand>{

    constructor(
        // Injects the repository implementation via its interface token
        @Inject("ICategoryRepository") private categoryRepo: ICategoryRepository,
        private mapper: CategoryMapper
    ){}

    async execute(command: DeleteCategoryCommand): Promise<DeleteResponseDto> {
        // Executes the deletion logic using the repository and the provided category ID
        await this.categoryRepo.delete(command.id);

        // Returns a standardized response indicating successful deletion
        return {result: DeletedResult.DELETED ,message:"Category deleted succesfully"}

    }

}