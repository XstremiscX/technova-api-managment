import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { DeleteBrandCommand } from "../commands/delete-brand.command";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { InternalServerErrorException } from "@nestjs/common";

@CommandHandler(DeleteBrandCommand)
export class DeleteBrandhandler implements ICommandHandler<DeleteBrandCommand>{

    constructor(
        private readonly brandRepo: IBrandRepository,
    ){}

    async execute(command: DeleteBrandCommand): Promise<object> {
        
        // The ID is extracted to verify later that the brand has been deleted.
        const id = command.id;

        // The method to remove the brand is executed.
        await this.brandRepo.deleteBrand(command.id);

        // We search for the brand and store the result in a variable to verify its status.
        const deleted = await this.brandRepo.getBrandById(id);

        if(deleted == null || deleted == undefined){

            // We return an object that indicates the status of the brand and a deletion message.
            return {result:"deleted",message:"Brand deleted succesfully"}
        }else{

            // If it has not been deleted, an internalServerError is thrown.
            throw new InternalServerErrorException("Internal server error.")
        }

    }

}