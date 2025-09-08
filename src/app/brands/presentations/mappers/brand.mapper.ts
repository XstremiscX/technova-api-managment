import { BaseMapper } from "src/app/commons/mappers/base.mapper";
import { Brand } from "../../domain/entities/brand";
import { BrandResponseDto } from "../dtos/response-brand.dto";
import { BrandEntity } from "../../domain/entities/brand.entity";

export class BrandMapper extends BaseMapper<Brand,BrandResponseDto,BrandEntity>{

    toResponseDtoFromDomain(brand: Brand): BrandResponseDto {
        
        return {id:brand._id, name:brand.getName()};

    }

    toResponseDtoFromEntity(entity: BrandEntity): BrandResponseDto {
        return {
            id: entity.id,
            name: entity.name
        }
    }

}