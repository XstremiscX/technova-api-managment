import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetByIdUserQuery } from "../queries/get-by-id-user.query";
import { Inject } from "@nestjs/common";
import type { IUserRepository } from "../../domain/interfaces/iuser-repository.interface";
import { UserResponseDto } from "../../presentations/dtos/response-user.dto";

/**
 * Handles the GetByIdUserQuery by retrieving a user's public data.
 * Delegates the lookup to the repository and returns a response DTO.
 */
@QueryHandler(GetByIdUserQuery)
export class GetByIdUserQueryHandler implements IQueryHandler<GetByIdUserQuery>{

    constructor(
        @Inject("IUserRepository") private readonly userRepository: IUserRepository
    ){}

    async execute(query: GetByIdUserQuery): Promise<UserResponseDto | null> {
        const user = await this.userRepository.findById(query.id);
        return user.returnDto();
    }

}