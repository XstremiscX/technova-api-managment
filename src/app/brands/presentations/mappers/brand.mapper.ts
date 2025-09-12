import { BaseMapper } from "@mappers/base.mapper";
import { Brand } from "../../domain/entities/brand";
import { BrandResponseDto } from "../dtos/response-brand.dto";
import { BrandEntity } from "../../domain/entities/brand.entity";
import { BadRequestException } from "@nestjs/common";

export class BrandMapper extends BaseMapper<Brand,BrandResponseDto,BrandEntity>{

    // Transform a Brand domain entity into a response DTO
    toResponseDtoFromDomain(brand: Brand): BrandResponseDto {
        if(brand.id === undefined) throw new Error("The brand id is undefined");
        return {id:brand.id, name: brand.getName()};

    }

    // Transform a Brand domain entity into a persistent BrandEntity entity
    toEntityFromDomain(brand: Brand): BrandEntity {
        if(!brand.id) throw new BadRequestException("Brand ID is needed.")
        const entity = new BrandEntity();
        entity.id = brand.id;
        entity.name = brand.getName();
        return entity;
    }

    // Transforms a persistent BrandEntity into a domain entity Brand
    toDomainFromEntity(entity: BrandEntity): Brand {
        return new Brand(entity.name, entity.id);
    }

}