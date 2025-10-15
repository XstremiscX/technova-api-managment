import { exists } from "fs";
import { CreateCategoryCommand } from "src/app/categories/application/commands/create-category.command";
import { CreateCategoryHandler } from "src/app/categories/application/handlers/create-category.handler";
import { Category } from "src/app/categories/domain/entities/category";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";

describe('CreateCategoryhandler',()=>{
    let handler:CreateCategoryHandler;
    let mockCategoryRepo: any;
    let mapper: any;

    beforeEach(()=>{
        mockCategoryRepo = {
            save: jest.fn(),
            existsByName: jest.fn()
        };
        mapper = {
            toResponseDtoFromDomain: jest.fn().mockImplementation((category:Category)=>{
                return {id: category.id, name: category.getName(), description: category.getDescription()}
            })
        };
        handler = new CreateCategoryHandler(mockCategoryRepo,mapper);
    })

    it('should be defined',()=>{
        expect(handler).toBeDefined();
    })

    it('should create a category and return a CategoryResponseDto',async()=>{

        const command = new CreateCategoryCommand('Electronics','Devices and gadgets');
        const category = new Category('some-uuid','Electronics','Devices and gadgets');
        const expectedResponse = mapper.toResponseDtoFromDomain(category);
        mockCategoryRepo.save.mockResolvedValue(category);

        const result = await handler.execute(command);

        expect(result).toEqual(expectedResponse);
    })

    it('should throw a BussinessError if category name is duplicated',async ()=>{
        const command = new CreateCategoryCommand('Electronics','Devices and gadgets');
        const category = new Category('some-uuid','Electronics','Devices and gadgets');

        mockCategoryRepo.existsByName.mockResolvedValue(true);
        mockCategoryRepo.save.mockImplementation(()=>{ throw new BussinessError("Can not duplicate a Category name.")});

        await expect(handler.execute(command)).rejects.toThrow(BussinessError);
    })

})