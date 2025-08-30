import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { Brand } from "../../domain/entities/brand";
import { CreateBrandCommand } from "../commands/create.brand.command";
import{ BrandMapper } from "../mappers/brand.mapper";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { BrandFactory } from "../../factories/brand.factory";

@CommandHandler(CreateBrandCommand)
export class CreateBrandHandler implements ICommandHandler<CreateBrandCommand>{

    constructor(
        @Inject("IBrandRepository") private readonly brandRepo:IBrandRepository,
        private readonly mapper: BrandMapper
    ){}

    async execute(command: CreateBrandCommand): Promise<BrandResponseDto> {
        try{
            // A new brand is created with the data received. 
            const brand = BrandFactory.createFromDto(command.dto);

            // Let's execute the createBrand repository function to save the new brand in the database.
            await this.brandRepo.createBrand(brand);

            // Returns ResponseDTO
            return this.mapper.toResponseDto(brand);

        }catch(e){

            
            if(e.name == "HttpException" || e.name == "BadRequestException"){
                throw e;
            }else{
                throw new HttpException(`Internal server error: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
            }

        }
        

    }

}