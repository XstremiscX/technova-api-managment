import { ICommandHandler, CommandHandler, CommandBus } from "@nestjs/cqrs";
import { UpdateBrandCommand } from "../commands/update-brand.command";
import type { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { Brand } from "../../domain/entities/brand";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { BrandMapper } from "../mappers/brand.mapper";
import { BadRequestException, Inject } from "@nestjs/common";

@CommandHandler(UpdateBrandCommand)
export class UpdateBrandHandler implements ICommandHandler<UpdateBrandCommand>{

    constructor(
        @Inject("IBrandRepository") private readonly brandRepo: IBrandRepository
    ){}

    async execute(command: UpdateBrandCommand): Promise<BrandResponseDto> {
        
        // We verify that the new name is not an undefined or null message.
        if(command.dto.name != undefined){

            // We create a new Brand with the data that will be updated and send you the ID to update that Brand.
            const brand = new Brand(command.id,command.dto.name)

            // We execute the method to update the brand and store the result.
            const brandUpdated = await this.brandRepo.updateBrand(brand);

            // We instantiate the brandMapper so we can use the method for converting domains to responseDto.
            const mapper = new BrandMapper()

            // Returns BrandResponseDto
            return mapper.toResponseDto(brandUpdated);

        }else{

            // If command.dto.name is empty, a badrequestexception is thrown.
            throw new BadRequestException("The brand name must be distinct from null or undefined.")

        }

    }

}
