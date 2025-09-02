import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { DeleteBrandCommand } from "../commands/delete-brand.command";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { Inject, NotFoundException } from "@nestjs/common";
import { DeletedResult } from "src/app/commons/utils/enums/deleted-resutls.enum";
import { DeleteBrandResponseDto } from "../../presentations/dtos/response-delete-brand.dto";

@CommandHandler(DeleteBrandCommand)
export class DeleteBrandHandler implements ICommandHandler<DeleteBrandCommand>{

    constructor(
        @Inject("IBrandRepository") private readonly brandRepo: IBrandRepository,
    ){}

    async execute(command: DeleteBrandCommand): Promise<DeleteBrandResponseDto> {

        // The ID is extracted to verify later that the brand has been deleted.
        const id = command.id;

        // Verify if exists a brand with the id.
        const brandExists = await this.brandRepo.findById(id);

        // The method to remove the brand is executed.
        await this.brandRepo.delete(command.id);

        // We return an object that indicates the status of the brand and a deletion message.
        return {result: DeletedResult.DELETED ,message:"Brand deleted succesfully"}

    }

}