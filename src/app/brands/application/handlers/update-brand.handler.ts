import { ICommandHandler, CommandHandler, CommandBus } from "@nestjs/cqrs";
import { UpdateBrandCommand } from "../commands/update-brand.command";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { Inject, NotFoundException} from "@nestjs/common";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import { BrandMapper } from "../../presentations/mappers/brand.mapper";

@CommandHandler(UpdateBrandCommand)
export class UpdateBrandHandler implements ICommandHandler<UpdateBrandCommand>{

    constructor(
        @Inject("IBrandRepository") private readonly brandRepo: IBrandRepository,
        private mapper : BrandMapper
    ){}

    async execute(command: UpdateBrandCommand): Promise<BrandResponseDto> {
        
        // Get the brand to update.
        const brand = await this.brandRepo.findById(command.id);

        //
        if(brand.getName() === command.newName.toUpperCase()) throw new BussinessError("The new name must be different from the current name.")

        // Rename the brand name.
        brand.rename(command.newName);

        // We execute the method to update the brand and store the result.
        const updatedBrand = await this.brandRepo.update(brand);

        // Returns BrandResponseDto
        return this.mapper.toResponseDto(updatedBrand);

    }

}
