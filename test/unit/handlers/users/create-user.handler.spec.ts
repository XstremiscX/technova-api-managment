import { CreateUserCommand } from "src/app/users/application/commands/create-user.command";
import { CreateUserHandler } from "src/app/users/application/handlers/create-user.handler";
import { UserBuilder } from "src/app/users/infrastructure/builders/user.builder";
import { UserMapper } from "src/app/users/presentations/mappers/user.mapper";
import { UserEntity } from "src/app/users/domain/entities/user.entity";
import { BadRequestException } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";

describe("CreateUserHandler",()=>{
    let createUserHandler: CreateUserHandler;
    let userRepositoryMock: any;
    let passwordServiceMock: any;
    let userCreatedEventServiceMock: any;
    let mapper: UserMapper;

    beforeEach(()=>{
        userRepositoryMock = {
            save: jest.fn()
        };
        passwordServiceMock ={
            hashPassword: jest.fn().mockReturnValue("hashedPassword")
        };
        userCreatedEventServiceMock = {
            emitUserCreatedEvent: jest.fn()
        };
        mapper = new UserMapper();
        createUserHandler = new CreateUserHandler(userRepositoryMock,passwordServiceMock,userCreatedEventServiceMock);
    });

    it('should be defined',()=>{
        expect(createUserHandler).toBeDefined();
    });

    it('should create a user and return UserResponseDto',async()=>{
        const command = new CreateUserCommand("John Doe","john.doe@example.com","0000000000","password",2,"123 Main St");

        const user = new UserBuilder(command.name,command.email,command.phone,command.address).withPassword("hashedPassword").withType(command.type).build();

        const userEntity = new UserEntity();
        userEntity.id = "user-id-123";
        userEntity.name = user.getName();
        userEntity.email = user.getEmail();
        userEntity.phone = user.getPhoneNumber();
        userEntity.address = user.getAddress() ?? "";
        userEntity.type = user.getType();
        userEntity.password = "hashedPassword";
        userEntity.status = true;
        userEntity.verified = true;

        const userPublicView = mapper.toUserPublicViewFromEntity(userEntity);

        userRepositoryMock.save.mockResolvedValue(userPublicView);

        const result = await createUserHandler.execute(command);

        expect(passwordServiceMock.hashPassword).toHaveBeenCalledWith(command.password);
        expect(userRepositoryMock.save).toHaveBeenCalled();
        expect(userCreatedEventServiceMock.emitUserCreatedEvent).toHaveBeenCalledWith(command.email,"user-id-123",command.name);
        expect(result).toEqual(userPublicView.returnDto());
    });

    it('should throw BadRequestException if the email is already in use',async()=>{
        const command = new CreateUserCommand("John Doe","john.doe@example.com","0000000000","password",2,"123 Main St");

        userRepositoryMock.existsByEmail = jest.fn().mockResolvedValue(true);

        userRepositoryMock.save.mockImplementation(() => {
            throw new BadRequestException(`Email ${command.email} is already in use.`);
        });

        await expect(createUserHandler.execute(command)).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if the user is not found after save',async()=>{
        const command = new CreateUserCommand("John Doe","john.doe@example.com","0000000000","password",2,"123 Main St");

        userRepositoryMock.save.mockImplementation(() => {
            throw new NotFoundException("User not found after save.");
        });

        await expect(createUserHandler.execute(command)).rejects.toThrow(NotFoundException);
    });
})