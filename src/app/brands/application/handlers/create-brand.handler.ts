import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { Brand } from "../../domain/entities/brand";
import { CreateBrandCommand } from "../commands/create-brand.command";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { v4 as uuid } from 'uuid';
import { Inject } from "@nestjs/common";
import { BrandMapper } from "../../presentations/mappers/brand.mapper";

@CommandHandler(CreateBrandCommand)
export class CreateBrandHandler implements ICommandHandler<CreateBrandCommand>{

    constructor(
        @Inject("IBrandRepository") private readonly brandRepo:IBrandRepository,
        private mapper : BrandMapper
    ){}

    async execute(command: CreateBrandCommand): Promise<BrandResponseDto> {

        // A new brand is created with the data received. 
        const brand = new Brand(uuid(),command.name);

        // Let's execute the createBrand repository function to save the new brand in the database.
        const saved = await this.brandRepo.save(brand);

        // Returns the brand
        return this.mapper.toResponseDto(saved);

    }

}