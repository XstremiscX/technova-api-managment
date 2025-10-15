import { CreateBrandCommand } from "src/app/brands/application/commands/create-brand.command";
import { CreateBrandHandler } from "src/app/brands/application/handlers/create-brand.handler";
import { Brand } from "src/app/brands/domain/entities/brand";
import { BrandResponseDto } from "src/app/brands/presentations/dtos/response-brand.dto";
import { BrandMapper } from "src/app/brands/presentations/mappers/brand.mapper";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";

describe("CreateBrandHandler",()=>{
    let createBrandHandler: CreateBrandHandler;
    let mockBrandRepository: any;
    let mapper: BrandMapper;

    beforeEach(()=>{
        mockBrandRepository ={
            save : jest.fn(),
        };
        mapper = new BrandMapper();
        createBrandHandler = new CreateBrandHandler(mockBrandRepository, mapper);
    })

    it('should be defined', () => {
        expect(createBrandHandler).toBeDefined();
    });

    it('should create a new brand and return a BrandResponseDto', async () => {
        const command = new CreateBrandCommand("Test Brand");
        const brand = new Brand(command.name);
        const expectedDto: BrandResponseDto = {
            id: expect.any(String),
            name: brand.getName()
        };

        mockBrandRepository.save.mockReturnValue(brand);

        const result = await createBrandHandler.execute(command);

        expect(mockBrandRepository.save).toHaveBeenCalledWith(expect.any(Brand));
        expect(result).toEqual(expectedDto);
    });

    it('should throw a BussinessError if the brand name is duplicate', async()=>{
        const command = new CreateBrandCommand("DuplicatedName");
        const brand = new Brand(command.name);

        const errorMessage = "Can not duplicate a brand name.";

        mockBrandRepository.save.mockImplementation(() => {
            throw new BussinessError(errorMessage);
        });
        
        await expect(createBrandHandler.execute(command)).rejects.toThrow(BussinessError);
        expect(mockBrandRepository.save).toHaveBeenCalledWith(expect.any(Brand));
    })

})