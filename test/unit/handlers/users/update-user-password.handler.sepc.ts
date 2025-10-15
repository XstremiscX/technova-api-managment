import { BadRequestException, NotFoundException } from "@nestjs/common";
import { UpdateUserPasswordCommand } from "src/app/users/application/commands/update-password.command";
import { UpdateUserPasswordHandler } from "src/app/users/application/handlers/update-user-password.handler";

describe('UpdateUserPasswordHandler',()=>{
    let updateUserPasswordHandler: UpdateUserPasswordHandler;
    let userRepositoryMock: any;
    let passwordServiceMock: any;

    beforeEach(()=>{
        userRepositoryMock = {
            updatePassword: jest.fn()
        }
        passwordServiceMock = {
            hashPassword: jest.fn()
        }
        updateUserPasswordHandler = new UpdateUserPasswordHandler(userRepositoryMock,passwordServiceMock);
    })

    it('should be defined',()=>{
        expect(updateUserPasswordHandler).toBeDefined();
    })

    it('should update user password and return a success message',async()=>{
        const command = new UpdateUserPasswordCommand("user-id","new-password", "new-password");
        userRepositoryMock.updatePassword.mockResolvedValue();

        const result = await updateUserPasswordHandler.execute(command);
        expect(result).toEqual({message: "Password updated successfully"});
    });

    it('should throw a BadRequestException if new password and confirm password do not match',async()=>{
        const command = new UpdateUserPasswordCommand("user-id","new-password", "different-password");  
        await expect(updateUserPasswordHandler.execute(command)).rejects.toThrow(BadRequestException);
    })

    it('shloud throw a BadRequestException if id is not sended',async()=>{
        const command = new UpdateUserPasswordCommand("","new-password", "new-password");  
        userRepositoryMock.updatePassword.mockImplementation(()=>{
            throw new BadRequestException("Id is required.");
        })
        await expect(updateUserPasswordHandler.execute(command)).rejects.toThrow(BadRequestException);
        expect(userRepositoryMock.updatePassword).toHaveBeenCalledWith("", expect.any(String));
    });

    it('should throw a BadRequestException if password is not sended',async()=>{
        const command = new UpdateUserPasswordCommand("user-id","", "");  
        userRepositoryMock.updatePassword.mockImplementation(()=>{
            throw new BadRequestException("Password is required.");
        })
        await expect(updateUserPasswordHandler.execute(command)).rejects.toThrow(BadRequestException);
        expect(userRepositoryMock.updatePassword).toHaveBeenCalledWith("user-id", expect.any(String));
        expect(passwordServiceMock.hashPassword).toHaveBeenCalledWith("");
    });

    it('should throw a NotFoundException if user not found',async()=>{
        const command = new UpdateUserPasswordCommand("non-existent-id","new-password", "new-password");
        userRepositoryMock.updatePassword.mockImplementation(()=>{
            throw new NotFoundException(`User with id ${command.id} not found.`);
        });

        await expect(updateUserPasswordHandler.execute(command)).rejects.toThrow(NotFoundException);
        expect(userRepositoryMock.updatePassword).toHaveBeenCalledWith("non-existent-id", expect.any(String));
        expect(passwordServiceMock.hashPassword).toHaveBeenCalledWith("new-password");
    });
})