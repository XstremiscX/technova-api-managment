import { GetByIdCategoryHandler } from "src/app/categories/application/handlers/get-by-id-categories.handler";
import { GetByIdCategoryQuery } from "src/app/categories/application/queries/get-by-id-categories.query";
import { Category } from "src/app/categories/domain/entities/category";
import { NotFoundException } from "@nestjs/common";

describe('GetByIdCategoryHandler',()=>{
    let handler:GetByIdCategoryHandler;
    let mockCategoryRepo: any;
    let mapper: any;

    beforeEach(()=>{
        mockCategoryRepo = {
            findById: jest.fn()
        };
        mapper = {
            toResponseDtoFromDomain: jest.fn().mockImplementation((category:Category)=>{
                return {id: category.id, name: category.getName(), description: category.getDescription()}
            })
        };
        handler = new GetByIdCategoryHandler(mockCategoryRepo, mapper);
    });

    it('should be defined',()=>{
        expect(handler).toBeDefined();
    });

    it('should return a CategoryResponseDto when a category is found',async()=>{
        const command = new GetByIdCategoryQuery('some-uuid');
        const category = new Category('some-uuid','Electronics','Devices and gadgets');
        const expectedResponse = mapper.toResponseDtoFromDomain(category);
        mockCategoryRepo.findById.mockResolvedValue(category);
        const result = await handler.execute(command);
        expect(result).toEqual(expectedResponse);
    });

    it('should return NotFoundException when category does not exist',async()=>{
        const command = new GetByIdCategoryQuery('some-uuid');

        mockCategoryRepo.findById.mockImplementation(()=>{ throw new NotFoundException(`Category with id: ${command.id} not found`); });
        await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
    });
});