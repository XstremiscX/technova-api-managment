import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetBrandByIdQuery } from "../queries/get-by-id-brand.query";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { NotFoundException, Inject } from "@nestjs/common";
import { BrandMapper } from "../../presentations/mappers/brand.mapper";

@QueryHandler(GetBrandByIdQuery)
export class GetBrandByIdHandler implements IQueryHandler<GetBrandByIdQuery>{
    
    constructor(
        @Inject("IBrandRepository") private readonly brandRepo: IBrandRepository,
        private mapper : BrandMapper
    ){}

    async execute(query:GetBrandByIdQuery): Promise<BrandResponseDto> {
        
        // Carry the brand.
        const brand  = await this.brandRepo.findById(query.id)

        // Returns Brand response
        return this.mapper.toResponseDto(brand);

    }

}
