import { BrandMapper } from "src/app/brands/presentations/mappers/brand.mapper";
import { Brand } from "src/app/brands/domain/entities/brand";
import { BrandResponseDto } from "src/app/brands/presentations/dtos/response-brand.dto";
import { BrandEntity } from "src/app/brands/domain/entities/brand.entity";

describe("BrandMapper",()=>{
    let mapper: BrandMapper;

    beforeEach(()=>{
        mapper = new BrandMapper();
    });

    it('should be defined', () => {
        expect(mapper).toBeDefined();
    });

    it('should map Brand domain entity to BrandResponseDto', () => {
        const brand = new Brand("TEST BRAND","test-id");
        const expectedDto: BrandResponseDto = {
            id: "test-id",
            name: brand.getName()
        };
        const result = mapper.toResponseDtoFromDomain(brand);
        expect(result).toEqual(expectedDto);
    });

    it('should map BrandEntity to Brand domain model', () => {
        const brandEntity = new BrandEntity();
        brandEntity.id = "entity-id";
        brandEntity.name = "Entity Brand";

        const result = mapper.toDomainFromEntity(brandEntity);
        expect(result).toBeInstanceOf(Brand);
        expect(result.id).toBe(brandEntity.id);
        expect(result.getName()).toBe(brandEntity.name.toUpperCase());

    });

    it('should map Brand domain model to BrandEntity', () => {
        const brand = new Brand("DOMAIN BRAND","domain-id");
        const result = mapper.toEntityFromDomain(brand);
        expect(result).toBeInstanceOf(BrandEntity);
        expect(result.id).toBe(brand.id);
        expect(result.name).toBe("DOMAIN BRAND");
    });

});