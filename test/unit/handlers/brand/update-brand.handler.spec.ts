import { UpdateBrandCommand } from "src/app/brands/application/commands/update-brand.command";
import { UpdateBrandHandler } from "src/app/brands/application/handlers/update-brand.handler";
import { Brand } from "src/app/brands/domain/entities/brand";
import { BrandResponseDto } from "src/app/brands/presentations/dtos/response-brand.dto";
import { BrandMapper } from "src/app/brands/presentations/mappers/brand.mapper";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import { NotFoundException } from "@nestjs/common";

describe("UpdateBrandHandler",()=>{
    let updateBrandHandler: UpdateBrandHandler;
    let mockBrandRepository: any;
    let mapper: BrandMapper;

    beforeEach(()=>{
        mockBrandRepository ={
            findById : jest.fn(),
            update: jest.fn(),
        };
        mapper = new BrandMapper();
        updateBrandHandler = new UpdateBrandHandler(mockBrandRepository, mapper);
    });

    it('should be defined', () => {
        expect(updateBrandHandler).toBeDefined();
    });

    it('should update an existing brand and return a BrandResponseDto', async () => {
        const command = new UpdateBrandCommand("Updated Brand Name","existing-id" );
        const existingBrand = new Brand("Old Brand Name","existing-id");
        const updatedBrand = new Brand(command.newName,existingBrand.id);
        const expectedDto: BrandResponseDto = {
            id: "existing-id",
            name: updatedBrand.getName()
        };
        mockBrandRepository.findById.mockReturnValue(existingBrand);
        mockBrandRepository.update.mockReturnValue(updatedBrand);
        const result = await updateBrandHandler.execute(command);
        expect(mockBrandRepository.findById).toHaveBeenCalledWith(command.id);
        expect(mockBrandRepository.update).toHaveBeenCalledWith(existingBrand);
        expect(result).toEqual(expectedDto);
    });

    it('should throw a BussinessError if the brand name is duplicated', async()=>{
        const command = new UpdateBrandCommand("Duplicated Name","existing-id" );
        const existingBrand = new Brand("Old Brand Name","existing-id");
        const errorMessage = "Can not duplicate a brand name.";

        mockBrandRepository.findById.mockReturnValue(existingBrand);
        mockBrandRepository.update.mockImplementation(() => {
            throw new BussinessError(errorMessage);
        });
        await expect(updateBrandHandler.execute(command)).rejects.toThrow(BussinessError);
        expect(mockBrandRepository.findById).toHaveBeenCalledWith(command.id);
        expect(mockBrandRepository.update).toHaveBeenCalledWith(existingBrand);
    })

    it('should throw NotFoundException if the brand does not exist', async()=>{
        const command = new UpdateBrandCommand("Any Name","non-existing-id" );
        const existingBrand = new Brand("Old Brand Name","existing-id");
        const errorMessage = `Brand with id: ${command.id} not found`;

        mockBrandRepository.findById.mockReturnValue(existingBrand);
        mockBrandRepository.update.mockImplementation(() => {
            throw new NotFoundException(errorMessage);
        });
        await expect(updateBrandHandler.execute(command)).rejects.toThrow(NotFoundException);
        expect(mockBrandRepository.findById).toHaveBeenCalledWith(command.id);
        expect(mockBrandRepository.update).toHaveBeenCalledWith(expect.any(Brand));
    });
});