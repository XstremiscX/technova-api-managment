import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { Brand } from "../../domain/entities/brand";
import { CreateBrandCommand } from "../commands/create-brand.command";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { Inject } from "@nestjs/common";
import { BrandMapper } from "../../presentations/mappers/brand.mapper";

// Registers this class as the handler for CreateBrandCommand
@CommandHandler(CreateBrandCommand)
export class CreateBrandHandler implements ICommandHandler<CreateBrandCommand>{

    constructor(
        // Injects the repository implementation via its interface token
        @Inject("IBrandRepository") private readonly brandRepo:IBrandRepository,

        // Mapper used to transform the domain entity into a response DTO
        private mapper : BrandMapper
    ){}

    async execute(command: CreateBrandCommand): Promise<BrandResponseDto> {

        // Creates a new Brand domain entity using a generated UUID and the name from the command
        const brand = new Brand(command.name);

        // Persists the new Brand using the repository
        const saved = await this.brandRepo.save(brand);

        // Maps the saved Brand to a DTO and returns it
        return this.mapper.toResponseDtoFromDomain(saved);

    }

}