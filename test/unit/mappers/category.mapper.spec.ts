import { CategoryMapper } from "src/app/categories/presentations/mappers/category.mapper";
import { Category } from "src/app/categories/domain/entities/category";
import { CategoryResponseDto } from "src/app/categories/presentations/dtos/response-category.dto";
import { CategoryEntity } from "src/app/categories/domain/entities/category.entity";


describe('CategoryMapper',()=>{
    let mapper: CategoryMapper;

    beforeEach(()=>{
        mapper = new CategoryMapper();
    });

    it('should be defined',()=>{
        expect(mapper).toBeDefined();
    });

    it('should map a Category domain entity to a CategoryResponseDto',()=>{
        const category = new Category('some-uuid','ELECTRONICS','Devices and gadgets');
        const expectedDto: CategoryResponseDto = {
            id: 'some-uuid',
            name: 'ELECTRONICS',
            description: 'Devices and gadgets'
        };
        const result = mapper.toResponseDtoFromDomain(category);
        expect(result).toEqual(expectedDto);
    });

    it('should map a CategoryEntity to a Category domain entity',()=>{
        const categoryEntity = new CategoryEntity();
        categoryEntity.id = 'some-uuid';
        categoryEntity.name = 'Electronics';
        categoryEntity.description = 'Devices and gadgets';
        const expectedDomainEntity = new Category(
            categoryEntity.id,
            categoryEntity.name,
            categoryEntity.description
        );
        const result = mapper.toDomainFromEntity(categoryEntity);
        expect(result).toEqual(expectedDomainEntity);
    });

    it('should map a Category domain entity to a CategoryEntity',()=>{
        const category = new Category('some-uuid','ELECTRONICS','Devices and gadgets');
        const expectedEntity = new CategoryEntity();
        expectedEntity.id = 'some-uuid';
        expectedEntity.name = 'ELECTRONICS';
        expectedEntity.description = 'Devices and gadgets';
        const result = mapper.toEntityFromDomain(category);
        expect(result).toEqual(expectedEntity);
    });
});