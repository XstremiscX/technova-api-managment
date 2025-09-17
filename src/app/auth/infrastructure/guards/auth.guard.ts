import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest();
    
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Token is missing');

    const payload = this.tokenService.verifyToken(token);
    
    request.user = payload;

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (requiredRoles && !requiredRoles.includes(payload.userType)) {
      throw new ForbiddenException('Access denied: insufficient role');
    }

    return true;
  }
}
