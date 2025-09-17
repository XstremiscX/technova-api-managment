import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import type { IUserRepository } from "../../domain/interfaces/iuser-repository.interface";
import { Inject } from "@nestjs/common";
import { CreateUserCommand } from "../commands/create-user.command";
import { UserBuilder } from "../../infrastructure/builders/user.builder";
import { UserResponseDto } from "../../presentations/dtos/response-user.dto";
import { PasswordService } from "../../infrastructure/services/password.service";

/**
 * Handles the CreateUserCommand by orchestrating user creation.
 * Builds a new User domain entity and persists it through the repository.
 * Returns a response DTO representing the created user.
 */
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand>{

    constructor(
        @Inject("IUserRepository") private readonly userRepository: IUserRepository,
        private readonly passwordService: PasswordService
    ){}

    async execute(command: CreateUserCommand): Promise<UserResponseDto> {
        
        const newUser = new UserBuilder(command.name,command.email,command.phone,command.address).withPassword(this.passwordService.hashPassword(command.password)).withType(command.type).build();

        const createduser =  await this.userRepository.save(newUser);

        return createduser.returnDto();
    }

}