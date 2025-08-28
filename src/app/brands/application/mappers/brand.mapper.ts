import { Brand } from "../../domain/entities/brand";
import { BrandEntity } from "../../domain/entities/brand.entity";

// This class is the mapper that will be responsible for converting data from the domain entity to the persistent entity and vice versa.

export class BrandMapper {
    
    static toDomain (entity:BrandEntity):Brand{
        return new Brand(
            entity.id,
            entity.name
        );
    }

    static toEntity (brand:Brand):BrandEntity{

        const entity = new BrandEntity();
        
        entity.id = brand.id;
        entity.name = brand.name;

        return entity;

    }

    static toDomainList(entityList: BrandEntity[]):Brand[]{
        return entityList.map(this.toDomain)
    }

}