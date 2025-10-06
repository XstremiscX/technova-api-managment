import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { DeleteBrandCommand } from "../commands/delete-brand.command";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { Inject} from "@nestjs/common";
import { DeletedResult } from "src/app/commons/utils/enums/deleted-resutls.enum";
import { DeleteResponseDto } from "src/app/commons/dtos/response-deleted-domain.dto";

// Registers this class as the handler for the DeleteBrandCommand
@CommandHandler(DeleteBrandCommand)
export class DeleteBrandHandler implements ICommandHandler<DeleteBrandCommand>{

    constructor(
        // Injects the repository implementation via its interface token
        @Inject("IBrandRepository") private readonly brandRepo: IBrandRepository,
    ){}

    async execute(command: DeleteBrandCommand): Promise<DeleteResponseDto> {

        // Executes the deletion logic using the repository and the provided brand ID
        await this.brandRepo.delete(command.id);

        // Returns a standardized response indicating successful deletion
        return {result: DeletedResult.DELETED ,message:"Brand deleted succesfully"}

    }

}