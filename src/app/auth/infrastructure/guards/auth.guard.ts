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

    const path = request.route.path;

    const paramId = request.params.id;

    if (!token) throw new UnauthorizedException('Token is missing');

    const payload = this.tokenService.verifyToken(token);

    if (path.includes('/users/') && paramId) {
      if (payload.userId !== paramId) {
        throw new ForbiddenException("You can only access or modify your own data.");
      }
    }
    
    request.user = payload;

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (requiredRoles && !requiredRoles.includes(payload.userType)) {
      throw new ForbiddenException('Access denied: insufficient role');
    }

    return true;

  }
}
