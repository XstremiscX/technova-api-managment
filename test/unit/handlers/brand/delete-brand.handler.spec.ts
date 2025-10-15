import { DeleteBrandHandler } from "src/app/brands/application/handlers/delete-brand.handler";
import { DeleteBrandCommand } from "src/app/brands/application/commands/delete-brand.command";
import { NotFoundException } from "@nestjs/common";
import { DeletedResult } from "src/app/commons/utils/enums/deleted-resutls.enum";
import { DeleteResponseDto } from "src/app/commons/dtos/response-deleted-domain.dto";

describe("DeleteBrandHandler",()=>{
    let deleteBrandHandler: DeleteBrandHandler;
    let mockBrandRepository: any;

    beforeEach(()=>{
        mockBrandRepository ={
            delete : jest.fn(),
        };
        deleteBrandHandler = new DeleteBrandHandler(mockBrandRepository);
    });

    it('should be defined', () => {
        expect(deleteBrandHandler).toBeDefined();
    });

    it('should delete a brand and return a DeleteResponseDto', async () => {
        const command = new DeleteBrandCommand("brand-id");
        const expectedDto: DeleteResponseDto = {
            result: DeletedResult.DELETED,
            message: "Brand deleted succesfully"
        };

        mockBrandRepository.delete.mockReturnValue(Promise<void>);

        const result = await deleteBrandHandler.execute(command);

        expect(mockBrandRepository.delete).toHaveBeenCalledWith(command.id);
        expect(result).toEqual(expectedDto);
    });

    it('should throw an NotFoundException if the brand does not exist', async()=>{
        const command = new DeleteBrandCommand("non-existent-id");
        const errorMessage = "Brand not found";

        mockBrandRepository.delete.mockImplementation(() => {
            throw new NotFoundException(errorMessage);
        });
        await expect(deleteBrandHandler.execute(command)).rejects.toThrow(NotFoundException);
        expect(mockBrandRepository.delete).toHaveBeenCalledWith(command.id);
    });
});