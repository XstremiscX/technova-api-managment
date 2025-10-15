import { UpdateUserHandler } from "src/app/users/application/handlers/update-user.handler";
import { UpdateUserCommand } from "src/app/users/application/commands/update-user.command";
import { UserPublicView } from "src/app/users/presentations/views/user-public.view";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('UpdateUserHandler',()=>{
    let updateUserHandler: UpdateUserHandler;
    let userRepositoryMock: any;

    beforeEach(()=>{
        userRepositoryMock = {
            findById: jest.fn(),
            update: jest.fn()
        }
        updateUserHandler = new UpdateUserHandler(userRepositoryMock);
    })

    it('should be defined',()=>{
        expect(updateUserHandler).toBeDefined();
    })

    it('should update a user and return UserResponseDto',async()=>{
        const command = new UpdateUserCommand("user-id","Jane Doe");
        const existingUser =  new UserPublicView("user-id","John Doe","john.doe@example.com","1234567890","123 Main St");
        const updatedUser = new UserPublicView("user-id","Jane Doe","john.doe@example.com","1234567890","123 Main St");

        userRepositoryMock.findById.mockResolvedValue(existingUser);
        userRepositoryMock.update.mockImplementation(async (user: UserPublicView) => {
            return updatedUser;
        });

        const result = await updateUserHandler.execute(command);
        expect(result).toEqual(updatedUser);
    });

    it('should throw a BadRequestException if user id is not sended in findById',async()=>{
        const command = new UpdateUserCommand("","Jane Doe");
        userRepositoryMock.findById.mockImplementation(()=>{
            throw new BadRequestException("Id is required.");
        })

        await expect(updateUserHandler.execute(command)).rejects.toThrow(BadRequestException);
        expect(userRepositoryMock.findById).toHaveBeenCalledWith("");
    })

    it('should throw a NotFoundException if user does not found in findById',async()=>{
        const command = new UpdateUserCommand("non-existent-id","Jane Doe");
        userRepositoryMock.findById.mockImplementation(()=>{
            throw new NotFoundException(`User with non-existent-id not found.`);
        })

        await expect(updateUserHandler.execute(command)).rejects.toThrow(NotFoundException);
        expect(userRepositoryMock.findById).toHaveBeenCalledWith("non-existent-id");
    });

    it('should throw a NotFoundException if user does not found in update',async()=>{
        const command = new UpdateUserCommand("user-id","Jane Doe");
        userRepositoryMock.findById.mockResolvedValue(new UserPublicView("user-id","John Doe","john.doe@example.com","1234567890","123 Main St"));
        userRepositoryMock.update.mockImplementation(()=>{
            throw new NotFoundException(`User with id ${command.id} not found.`);
        });

        await expect(updateUserHandler.execute(command)).rejects.toThrow(NotFoundException);
        expect(userRepositoryMock.findById).toHaveBeenCalledWith("user-id");
        expect(userRepositoryMock.update).toHaveBeenCalled();
    });

    it('should throw a NotFoundException if user does not found in update after update',async()=>{
        const command = new UpdateUserCommand("user-id","Jane Doe");
        userRepositoryMock.findById.mockResolvedValue(new UserPublicView("user-id","John Doe","john.doe@example.com","1234567890","123 Main St"));
        userRepositoryMock.update.mockImplementation(()=>{
            throw new NotFoundException(`User not found after update.`);
        });
        await expect(updateUserHandler.execute(command)).rejects.toThrow(NotFoundException);
        expect(userRepositoryMock.findById).toHaveBeenCalledWith("user-id");
        expect(userRepositoryMock.update).toHaveBeenCalled();
    });

    
})