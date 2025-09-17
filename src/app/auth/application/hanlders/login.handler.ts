import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { LoginCommand } from "../commands/login.command";
import { Inject } from "@nestjs/common";
import { LoginResponseDto } from "../../presentation/dtos/response-login.dto";
import type { IAuthService } from "../../domain/interfaces/iauth-service.interface";
import type { ITokenService } from "../../domain/interfaces/itoken-service.interface";


@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
    @Inject('ITokenService') private readonly tokenService: ITokenService
  ) {}

  async execute(command: LoginCommand): Promise<LoginResponseDto> {

    const user = await this.authService.validateCredentials(command.userEmail, command.userPassword);

    const token = this.tokenService.generateToken(user.id, user.getEmail(), user.getUserType());

    return {JWT:token}
    
  }

}
