import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllBrandsQuery } from "../queries/get-all-brands.query";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { Inject } from "@nestjs/common";
import { BrandMapper } from "../../presentations/mappers/brand.mapper";


@QueryHandler(GetAllBrandsQuery)
export class GetAllBrandsHandler implements IQueryHandler<GetAllBrandsQuery>{
    constructor(
        @Inject("IBrandRepository")  private readonly brandRepo: IBrandRepository,
        private mapper: BrandMapper
    ){}

    async execute():Promise<BrandResponseDto[]> {

        // We carry all brands.
        const brandList = await this.brandRepo.findAll();

        // Return the list
        return brandList.map(e => {return this.mapper.toResponseDto(e)});
        
    }
}