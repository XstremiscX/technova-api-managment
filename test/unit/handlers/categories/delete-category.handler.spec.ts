import { NotFoundException } from "@nestjs/common";
import { DeleteCategoryCommand } from "src/app/categories/application/commands/delete-category.command";
import { DeleteCategoryHandler } from "src/app/categories/application/handlers/delete-category.handler";
import { DeletedResult } from "src/app/commons/utils/enums/deleted-resutls.enum";

describe('DeleteCategoryHandler',()=>{
    let handler:DeleteCategoryHandler;
    let mockCategoryRepo: any;
    let mapper: any;

    beforeEach(()=>{
        mockCategoryRepo = {
            delete: jest.fn()
        };
        mapper = {
            toResponseDtoFromDomain: jest.fn()
        };
        handler = new DeleteCategoryHandler(mockCategoryRepo, mapper);
    });

    it('should be defined',()=>{
        expect(handler).toBeDefined();
    });

    it('should delete a category and return a DeletedResult',async()=>{
        const command = new DeleteCategoryCommand('some-uuid');

        mockCategoryRepo.delete.mockResolvedValue(Promise<void>);

        const result = await handler.execute(command);

        expect(result).toEqual({result: DeletedResult.DELETED, message: "Category deleted succesfully"});
    });

    it('should throw an error if category does not exist',async()=>{
        const command = new DeleteCategoryCommand('some-uuid');

        mockCategoryRepo.delete.mockImplementation(()=>{ throw new NotFoundException(`Category with id: ${command.id} not found`); });

        await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
    });
});