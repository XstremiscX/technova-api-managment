import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { VerifyEmailCommand } from "../commands/verify-email.command";
import { Inject } from "@nestjs/common";
import type { IUserRepository } from "src/app/users/domain/interfaces/iuser-repository.interface";

// Handler for VerifyEmailCommand: marks the user's email as verified
@CommandHandler(VerifyEmailCommand)
export class VerifyEmailCommandHanlder implements ICommandHandler<VerifyEmailCommand>{

    constructor(
        @Inject("IUserRepository") private readonly userRepository: IUserRepository
    ){}

    async execute(command: VerifyEmailCommand): Promise<any> {
        
        return await this.userRepository.verifyUserEmail(command.id);

    }
}