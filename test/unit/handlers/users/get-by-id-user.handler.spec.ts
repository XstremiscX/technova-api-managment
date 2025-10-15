import { GetByIdUserHandler } from "src/app/users/application/handlers/get-by-id-user.handler";
import { GetByIdUserQuery } from "src/app/users/application/queries/get-by-id-user.query";
import { UserPublicView } from "src/app/users/presentations/views/user-public.view";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { UserResponseDto } from "src/app/users/presentations/dtos/response-user.dto";

describe('GetByIdUserHandler',()=>{
    let getByIdUserHandler: GetByIdUserHandler;
    let userRepositoryMock: any;

    beforeEach(()=>{
        userRepositoryMock = {
            findById: jest.fn()
        }
        getByIdUserHandler = new GetByIdUserHandler(userRepositoryMock);
    })

    it('should be defined',()=>{
        expect(getByIdUserHandler).toBeDefined();
    })

    it('should return a user by id',async()=>{
        const query = new GetByIdUserQuery("user-id");
        const expectedUser = new UserPublicView("user-id","John Doe","1234567890","john.doe@example.com","123 Main St");
        const expectedResult: UserResponseDto = {
            id: "user-id",
            name: "John Doe",
            phone: "1234567890",
            email: "john.doe@example.com",
            address: "123 Main St"
        }

        userRepositoryMock.findById.mockResolvedValue(expectedUser);

        const result = await getByIdUserHandler.execute(query);
        expect(result).toEqual(expectedResult);
    });

    it('should throw a BadRequestException if id is not provided',async()=>{
        const query = new GetByIdUserQuery("");
        userRepositoryMock.findById.mockImplementation(()=>{
            throw new BadRequestException("Id is required.");
        })

        await expect(getByIdUserHandler.execute(query)).rejects.toThrow(BadRequestException);
        expect(userRepositoryMock.findById).toHaveBeenCalledWith("");
    })

    it('should throw a NotFoundException if user does not found',async()=>{
        const query = new GetByIdUserQuery("non-existent-id");
        userRepositoryMock.findById.mockImplementation(()=>{
            throw new NotFoundException(`User with non-existent-id not found.`);
        })

        await expect(getByIdUserHandler.execute(query)).rejects.toThrow(NotFoundException);
        expect(userRepositoryMock.findById).toHaveBeenCalledWith("non-existent-id");
    });
})