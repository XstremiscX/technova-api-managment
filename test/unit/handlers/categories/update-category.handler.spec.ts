import { UpdateCategoryCommand } from "src/app/categories/application/commands/update-category.command";
import { UpdateCategoryHandler } from "src/app/categories/application/handlers/update-category.handler";
import { CategoryResponseDto } from "src/app/categories/presentations/dtos/response-category.dto";
import { Category } from "src/app/categories/domain/entities/category";
import { NotFoundException } from "@nestjs/common";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";

describe('UpdateCategoryHandler',()=>{
    let handler:UpdateCategoryHandler;
    let mockCategoryRepo: any;
    let mapper: any;

    beforeEach(()=>{
        mockCategoryRepo = {
            update: jest.fn(),
            findById: jest.fn()
        };
        mapper = {
            toResponseDtoFromDomain: jest.fn().mockImplementation((category:Category)=>{
                return {id: category.id, name: category.getName(), description: category.getDescription()}
            })
        };
        handler = new UpdateCategoryHandler(mockCategoryRepo, mapper);
    })

    it('should be defined',()=>{
        expect(handler).toBeDefined();
    })

    it('should update a category and return a CategoryResponseDto',async()=>{
        const command = new UpdateCategoryCommand('some-uuid','Electronics','Updated description');
        const category = new Category('some-uuid','Electronics','Updated description');
        const currentCategory = new Category('some-uuid','Last Name','Devices and gadgets');
        const expectedResponse : CategoryResponseDto = mapper.toResponseDtoFromDomain(category);
        mockCategoryRepo.findById.mockResolvedValue(currentCategory);
        mockCategoryRepo.update.mockResolvedValue(category);
        const result = await handler.execute(command);
        expect(result).toEqual(expectedResponse);
    });

    it('should throw a NotFoundException if category does not exist',async()=>{
        const command = new UpdateCategoryCommand('some-uuid','Electronics','Updated description');

        mockCategoryRepo.findById.mockImplementation(()=>{ throw new NotFoundException(`Category with id: ${command.id} not found`); });

        await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
    })

    it('should throw a BussinessError if updating to a duplicated name',async()=>{
        const command = new UpdateCategoryCommand('some-uuid','Electronics','Updated description');
        const currentCategory = new Category('some-uuid','Electronics','Devices and gadgets');

        mockCategoryRepo.findById.mockResolvedValue(currentCategory);
        mockCategoryRepo.update.mockImplementation(()=>{ throw new BussinessError("Can not duplicate a Category name.")});

        await expect(handler.execute(command)).rejects.toThrow(BussinessError);
    });
});