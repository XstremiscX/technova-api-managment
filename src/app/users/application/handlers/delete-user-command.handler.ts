import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import type { IUserRepository } from "../../domain/interfaces/iuser-repository.interface";
import { Inject } from "@nestjs/common";
import { DeleteUserCommand } from "../commands/delete-user.command";
import { DeleteResponseDto } from "src/app/commons/utils/response-deleted-domain.dto";
import { DeletedResult } from "src/app/commons/utils/enums/deleted-resutls.enum";

/**
 * Handles the DeleteUserCommand by performing a soft delete on the user.
 * Delegates the deletion logic to the repository and returns a standardized response.
 */
@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand>{

    constructor(
        @Inject("IUserRepository") private readonly userRepository: IUserRepository,
    ){}

    async execute(command: DeleteUserCommand): Promise<DeleteResponseDto> {

        await this.userRepository.softDelete(command.id);

        return {result:DeletedResult.DELETED, message:"User soft deleted successfully"};
       
    }

}