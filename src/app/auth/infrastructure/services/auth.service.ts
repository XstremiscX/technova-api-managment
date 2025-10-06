import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { PasswordService } from "src/app/users/infrastructure/services/password.service";
import { IAuthService } from "../../domain/interfaces/iauth-service.interface";
import { UserRepository } from "src/app/users/infrastructure/repositories/user.repository";
import { LoginUserView } from "../../presentation/views/login-user.view";

// Service responsible for validating user credentials during login
@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject("IUserRepository") private readonly userRepo: UserRepository, private readonly passwordService: PasswordService) {}

  async validateCredentials(email: string, password: string): Promise<LoginUserView> {
    const user = await this.userRepo.findByEmail(email);
    if(!user) throw new NotFoundException(`User with email: ${email} doesn't exists`)
    const isValid = this.passwordService.verifyPassword(password, user.getHashedPassword());
    if (!isValid) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}
