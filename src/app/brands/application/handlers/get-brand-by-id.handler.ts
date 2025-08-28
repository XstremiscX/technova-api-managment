import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetBrandByIdQuery } from "../queries/get-brand-by-id.query";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { BrandMapper } from "../mappers/brand.mapper";
import { NotFoundException, Inject } from "@nestjs/common";

@QueryHandler(GetBrandByIdQuery)
export class GetBrandByIdHandler implements IQueryHandler<GetBrandByIdQuery>{
    
    constructor(
        @Inject("IBrandRepository") private readonly brandRepo: IBrandRepository,
    ){}

    async execute(query:GetBrandByIdQuery): Promise<BrandResponseDto> {
        
        // Carry the brand.
        const brand  = await this.brandRepo.getBrandById(query.id)

        if(brand){

            // We instantiate the brandMapper so we can use the method for converting domains to responseDto.
            const mapper = new BrandMapper()

            // convert domain into ResponseDtos
            const brandResponse = mapper.toResponseDto(brand);

            // Returns Brand response
            return brandResponse;

        }else{

            // If brand is empty, throw an exception.
            throw new NotFoundException("Brand not found")

        }


    }

}
