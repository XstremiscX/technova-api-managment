import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import type { IUserRepository } from "../../domain/interfaces/iuser-repository.interface";
import { BadRequestException, Inject } from "@nestjs/common";
import { UpdateUserPasswordCommand } from "../commands/update-password.command";
import { PasswordService } from "../../infrastructure/services/password.service";

/**
 * Handles the UpdateUserPasswordCommand by validating and updating a user's password.
 * Ensures the new password matches its confirmation, hashes it, and persists the change.
 */
@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordCommandHandler implements ICommandHandler<UpdateUserPasswordCommand>{

    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository
        , private passwordService: PasswordService
    ) {}

    async execute(command: UpdateUserPasswordCommand): Promise<object> {

        const { id, newPassword, confirmPassword} = command;

        if(newPassword !== confirmPassword) throw new BadRequestException("New password and confirm password do not match.");

        const hashedPassword = this.passwordService.hashPassword(newPassword);

        await this.userRepository.updatePassword(id, hashedPassword);

        return {message: "User password updated successfully"};

    }

}