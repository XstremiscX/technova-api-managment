import { ICommandHandler, CommandHandler, CommandBus } from "@nestjs/cqrs";
import { UpdateBrandCommand } from "../commands/update-brand.command";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { Inject, NotFoundException} from "@nestjs/common";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import { BrandMapper } from "../../presentations/mappers/brand.mapper";

// Registers this class as the handler for UpdateBrandCommand in the CQRS flow
@CommandHandler(UpdateBrandCommand)
export class UpdateBrandHandler implements ICommandHandler<UpdateBrandCommand> {

    constructor(
        // Injects the repository implementation via its interface token
        @Inject("IBrandRepository") private readonly brandRepo: IBrandRepository,
        
        // Mapper used to convert the domain entity into a response DTO
        private mapper: BrandMapper
    ) {}

    async execute(command: UpdateBrandCommand): Promise<BrandResponseDto> {
        // Retrieves the Brand domain entity by ID using the repository
        const brand = await this.brandRepo.findById(command.id);

        // Validates that the new name is actually different from the current one
        if (brand.getName() === command.newName.toUpperCase()) {
            throw new BussinessError("The new name must be different from the current name.");
        }

        // Applies the name change to the domain entity
        brand.rename(command.newName);

        // Persists the updated Brand entity using the repository
        const updatedBrand = await this.brandRepo.update(brand);

        // Maps the updated entity to a DTO and returns it
        return this.mapper.toResponseDto(updatedBrand);
    }
}

