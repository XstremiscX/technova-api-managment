import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import type { IUserRepository } from "../../domain/interfaces/iuser-repository.interface";
import { Inject, NotFoundException } from "@nestjs/common";
import { UpdateUserCommand } from "../commands/update-user.command";
import { UserResponseDto } from "../../presentations/dtos/response-user.dto";

/**
 * Handles the UpdateUserCommand by applying changes to a user's public data.
 * Retrieves the user, applies field-level updates, and persists the result.
 * Throws if the user is not found or if any business rules are violated during mutation.
 */
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand>{
    constructor(
        @Inject("IUserRepository") private readonly userRepository: IUserRepository
    ){}

    async execute(command: UpdateUserCommand): Promise<UserResponseDto> {

        const user = await this.userRepository.findById(command.id);

        if(!user) throw new NotFoundException(`User with ${command.id} not found.`);

        if(command.address) user.changeAddress(command.address);
        if(command.name) user.changeName(command.name);
        if(command.email) user.changeEmail(command.email);
        if(command.phone) user.changePhoneNumber(command.phone);

        const updatedUser =  await this.userRepository.update(user);

        return updatedUser.returnDto();
    }
}