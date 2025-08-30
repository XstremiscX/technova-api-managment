import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllBrandsQuery } from "../queries/get-all-brands.query";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BrandMapper } from "../mappers/brand.mapper";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { NotFoundException, Inject } from "@nestjs/common";


@QueryHandler(GetAllBrandsQuery)
export class GetAllBrandsHandler implements IQueryHandler<GetAllBrandsQuery>{
    constructor(
        @Inject("IBrandRepository")  private readonly brandRepo: IBrandRepository,
        private readonly mapper:BrandMapper
    ){}

    async execute():Promise<BrandResponseDto[]> {

        
        // We carry all brands.
        const brandList = await this.brandRepo.listAllBrands();

        // We check to see if there are any brand.
        if(brandList){

            // We convert domains into ResponseDtos
            const brandListConverted = brandList.map(e=> this.mapper.toResponseDto(e));

            // Return the list
            return brandListConverted;

        }else{
            
            // If brandList is empty, throw an exception.
            throw new NotFoundException("Brands not found")

        }

        
        
    }
}