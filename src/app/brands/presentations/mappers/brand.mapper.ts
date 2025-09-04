import { BaseMapper } from "src/app/commons/mappers/base.mapper";
import { Brand } from "../../domain/entities/brand";
import { BrandResponseDto } from "../dtos/response-brand.dto";

export class BrandMapper extends BaseMapper<Brand,BrandResponseDto>{

    toResponseDto(brand: Brand): BrandResponseDto {
        
        return {id:brand._id, name:brand.getName()};

    }

}