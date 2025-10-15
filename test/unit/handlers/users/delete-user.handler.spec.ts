import { DeleteUserCommand } from "src/app/users/application/commands/delete-user.command";
import { DeleteUserHandler } from "src/app/users/application/handlers/delete-user.handler";
import { DeletedResult } from "src/app/commons/utils/enums/deleted-resutls.enum";
import { BadRequestException } from "@nestjs/common";

describe("DeleteUserHandler",()=>{
    let deleteUserHandler: DeleteUserHandler;
    let userRepositoryMock: any;

    beforeEach(()=>{
        userRepositoryMock = {
            softDelete: jest.fn()
        };
        deleteUserHandler = new DeleteUserHandler(userRepositoryMock);
    });

    it('should be defined',()=>{
        expect(deleteUserHandler).toBeDefined();
    })

    it("should soft delete a user and return a success response",async ()=>{
        const command = new DeleteUserCommand("user-id");
        const result = await deleteUserHandler.execute(command);
        expect(userRepositoryMock.softDelete).toHaveBeenCalledWith("user-id");
        expect(result).toEqual({result: DeletedResult.DELETED, message:"User soft deleted successfully"});
    });

    it('should throw a BadRequestException if id is not provided',async()=>{
        const command = new DeleteUserCommand("");
        userRepositoryMock.softDelete.mockImplementation(() => {
            throw new BadRequestException("Id is required.");
        });
        await expect(deleteUserHandler.execute(command)).rejects.toThrow(BadRequestException);
        expect(userRepositoryMock.softDelete).toHaveBeenCalledWith("");
    })
});