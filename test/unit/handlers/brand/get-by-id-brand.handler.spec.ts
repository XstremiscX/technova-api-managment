import { GetBrandByIdQuery } from "src/app/brands/application/queries/get-by-id-brand.query";
import { GetBrandByIdHandler } from "src/app/brands/application/handlers/get-by-id-brand.handler";
import { Brand } from "src/app/brands/domain/entities/brand";
import { BrandResponseDto } from "src/app/brands/presentations/dtos/response-brand.dto";
import { BrandMapper } from "src/app/brands/presentations/mappers/brand.mapper";
import { NotFoundException } from "@nestjs/common";

describe("GetBrandByIdHandler",()=>{
    let getBrandByIdHandler: GetBrandByIdHandler;
    let mockBrandRepository: any;
    let mapper: BrandMapper;

    beforeEach(()=>{
        mockBrandRepository ={
            findById : jest.fn(),
        };
        mapper = new BrandMapper();
        getBrandByIdHandler = new GetBrandByIdHandler(mockBrandRepository, mapper);
    })

    it('should be defined', () => {
        expect(getBrandByIdHandler).toBeDefined();
    });

    it('should return a BrandResponseDto for an existing brand', async () => {
        const query = new GetBrandByIdQuery("existing-id");
        const existingBrand = new Brand("Existing Brand", "existing-id");
        const expectedDto: BrandResponseDto = {
            id: "existing-id",
            name: existingBrand.getName()
        };

        mockBrandRepository.findById.mockResolvedValue(existingBrand);
        const result = await getBrandByIdHandler.execute(query);
        expect(result).toEqual(expectedDto);
        expect(mockBrandRepository.findById).toHaveBeenCalledWith("existing-id");
    });

    it('should throw a NotFoundException for a non-existing brand', async () => {
        const query = new GetBrandByIdQuery("non-existing-id");
        mockBrandRepository.findById.mockImplementation(()=>{
            throw new NotFoundException(`Brand with id: ${query.id} not found`);
        });
        await expect(getBrandByIdHandler.execute(query)).rejects.toThrow(NotFoundException);
    });
});