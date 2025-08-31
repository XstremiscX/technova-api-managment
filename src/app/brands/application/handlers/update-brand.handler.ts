import { ICommandHandler, CommandHandler, CommandBus } from "@nestjs/cqrs";
import { UpdateBrandCommand } from "../commands/update-brand.command";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import {  Inject } from "@nestjs/common";
import { BrandFactory } from "../../factories/brand.factory";

@CommandHandler(UpdateBrandCommand)
export class UpdateBrandHandler implements ICommandHandler<UpdateBrandCommand>{

    constructor(
        @Inject("IBrandRepository") private readonly brandRepo: IBrandRepository
    ){}

    async execute(command: UpdateBrandCommand): Promise<BrandResponseDto> {

        // We update the brand with the data sent in the command.
        const brand = BrandFactory.updateFromCommand(command)

        // We execute the method to update the brand and store the result.
        const brandUpdated = await this.brandRepo.updateBrand(brand);

        // Returns BrandResponseDto
        return brandUpdated;

    }

}
