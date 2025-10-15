import { GetAllCategoriesHandler } from "src/app/categories/application/handlers/get-all-categories.handler";
import { GetAllCategoriesQuery } from "src/app/categories/application/queries/get-all-categories.query";
import { CategoryResponseDto } from "src/app/categories/presentations/dtos/response-category.dto";
import { Category } from "src/app/categories/domain/entities/category";

describe('GetAllCategoriesHandler',()=>{
    let handler:GetAllCategoriesHandler;
    let mockCategoryRepo: any;
    let mapper: any;

    beforeEach(()=>{
        mockCategoryRepo = {
            findAll: jest.fn()
        };
        mapper = {
            toResponseDtoFromDomain: jest.fn().mockImplementation((category:Category)=>{
                return {id: category.id, name: category.getName(), description: category.getDescription()}
            })
        };
        handler = new GetAllCategoriesHandler(mockCategoryRepo, mapper);
    });

    it('should be defined',()=>{
        expect(handler).toBeDefined();
    });

    it('should return an array of CategoryResponseDto',async()=>{
        const categories = [
            new Category('uuid-1','Electronics','Devices and gadgets'),
            new Category('uuid-2','Books','All kinds of books'),
            new Category('uuid-3','Clothing','Apparel and accessories')
        ];
        const expectedResponse: CategoryResponseDto[] = categories.map((category) => {return mapper.toResponseDtoFromDomain(category)});
        mockCategoryRepo.findAll.mockResolvedValue(categories);
        const result = await handler.execute();
        expect(result).toEqual(expectedResponse);
    })

    it('should return an empty array if no categories exist',async()=>{
        mockCategoryRepo.findAll.mockResolvedValue([]);
        const result = await handler.execute();
        expect(result).toEqual([]);
    })
})