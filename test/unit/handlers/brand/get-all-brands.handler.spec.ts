import { GetAllBrandsHandler } from "src/app/brands/application/handlers/get-all-brands.handler";
import { GetAllBrandsQuery } from "src/app/brands/application/queries/get-all-brands.query";
import { Brand } from "src/app/brands/domain/entities/brand";
import { BrandResponseDto } from "src/app/brands/presentations/dtos/response-brand.dto";
import { BrandMapper } from "src/app/brands/presentations/mappers/brand.mapper";

describe("GetAllBrandsHandler",()=>{
    let getAllBrandsHandler: GetAllBrandsHandler;
    let mockBrandRepository: any;
    let mapper: BrandMapper;

    beforeEach(()=>{
        mockBrandRepository ={
            findAll : jest.fn(),
        };
        mapper = new BrandMapper();
        getAllBrandsHandler = new GetAllBrandsHandler(mockBrandRepository, mapper);
    })

    it('should be defined', () => {
        expect(getAllBrandsHandler).toBeDefined();
    });

    it('should return an array of BrandResponseDto', async () => {
        const brand1 = new Brand("Brand One", "id-1");
        const brand2 = new Brand("Brand Two", "id-2");
        const brandList = [brand1, brand2];
        const expectedDtoList:BrandResponseDto[ ] = brandList.map(brand=>{return mapper.toResponseDtoFromDomain(brand)});
        mockBrandRepository.findAll.mockResolvedValue(brandList);
        const result = await getAllBrandsHandler.execute();
        expect(result).toEqual(expectedDtoList);
    });

    it('should return an empty array if no brands exist', async () => {
        const brandList: Brand[] = [];
        mockBrandRepository.findAll.mockResolvedValue(brandList);
        const result = await getAllBrandsHandler.execute();
        expect(result).toEqual([]);
    });
    
});