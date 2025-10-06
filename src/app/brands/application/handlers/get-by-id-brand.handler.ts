import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetBrandByIdQuery } from "../queries/get-by-id-brand.query";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { NotFoundException, Inject } from "@nestjs/common";
import { BrandMapper } from "../../presentations/mappers/brand.mapper";

// Registers this class as the handler for GetBrandByIdQuery in the CQRS flow
@QueryHandler(GetBrandByIdQuery)
export class GetBrandByIdHandler implements IQueryHandler<GetBrandByIdQuery> {

    constructor(
        // Injects the repository implementation via its interface token
        @Inject("IBrandRepository") private readonly brandRepo: IBrandRepository,

        // Mapper used to convert the domain entity into a response DTO
        private mapper: BrandMapper
    ) {}

    async execute(query: GetBrandByIdQuery): Promise<BrandResponseDto> {
        // Retrieves the Brand domain entity by ID using the repository
        const brand = await this.brandRepo.findById(query.id);

        // Maps the domain entity to a DTO and returns it
        return this.mapper.toResponseDtoFromDomain(brand);
    }
}

