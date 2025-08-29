import { plainToInstance } from "class-transformer";
import { Brand } from "../../domain/entities/brand";
import { BrandEntity } from "../../domain/entities/brand.entity";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { BaseMapper } from "src/app/commons/utils/base.mapper";

// This class is the mapper that will be responsible for converting data from the domain entity to the persistent entity and vice versa.

export class BrandMapper extends BaseMapper<Brand,BrandEntity,BrandResponseDto> {
    
    // Convert persistent entities into domains.
    toDomain (entity:BrandEntity):Brand{
        return new Brand(
            entity.id,
            entity.name
        );
    }

    // Conver domains into persistent entities.
    toEntity (brand:Brand):BrandEntity{

        const entity = new BrandEntity();
        
        entity.id = brand.id;
        entity.name = brand.name;

        return entity;

    }

    // This converts a domain into a ResponseDto.
    toResponseDto(brand:Brand):BrandResponseDto{

        return plainToInstance(BrandResponseDto,brand,{excludeExtraneousValues:true});

    }

}