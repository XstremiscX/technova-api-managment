import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllBrandsQuery } from "../queries/get-all-brands.query";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { Inject } from "@nestjs/common";
import { BrandMapper } from "../../presentations/mappers/brand.mapper";

// Registers this class as the handler for the GetAllBrandsQuery
@QueryHandler(GetAllBrandsQuery)
export class GetAllBrandsHandler implements IQueryHandler<GetAllBrandsQuery>{
    constructor(
        // Injects the repository implementation via its interface token
        @Inject("IBrandRepository")  private readonly brandRepo: IBrandRepository,
        
        // Mapper used to transform domain entities into response DTOs
        private mapper: BrandMapper
    ){}

    async execute():Promise<BrandResponseDto[]> {

        // Retrieves all Brands domain entities from the repository
        const brandList = await this.brandRepo.findAll();

        // Maps each Brand entity to a response DTO and returns the full list
        return brandList.map(brand => this.mapper.toResponseDtoFromDomain(brand)); 
    }
}