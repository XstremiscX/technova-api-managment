import { LoginCommandHandler } from 'src/app/auth/application/handlers/login.handler';
import { LoginCommand } from 'src/app/auth/application/commands/login.command';
import { LoginResponseDto } from 'src/app/auth/presentation/dtos/response-login.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('LoginCommandHandler (unit)', () => {
  let authServiceMock: { validateCredentials: jest.Mock };
  let tokenServiceMock: { generateToken: jest.Mock };
  let handler: LoginCommandHandler;

  beforeEach(() => {
    authServiceMock = { validateCredentials: jest.fn() };
    tokenServiceMock = { generateToken: jest.fn() };
    handler = new LoginCommandHandler(authServiceMock as any, tokenServiceMock as any);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return JWT when credentials are valid', async () => {
    const userView = {
      id: 'user-1',
      getEmail: () => 'user@example.com',
      getUserType: () => 1,
    } as any;

    authServiceMock.validateCredentials.mockResolvedValue(userView);
    tokenServiceMock.generateToken.mockReturnValue('signed.jwt.token');

    const command = new LoginCommand('user@example.com', 'password123');
    const result: LoginResponseDto = await handler.execute(command);

    expect(authServiceMock.validateCredentials).toHaveBeenCalledTimes(1);
    expect(authServiceMock.validateCredentials).toHaveBeenCalledWith('user@example.com', 'password123');

    expect(tokenServiceMock.generateToken).toHaveBeenCalledTimes(1);
    expect(tokenServiceMock.generateToken).toHaveBeenCalledWith('user-1', 'user@example.com', 1);

    expect(result).toEqual({ JWT: 'signed.jwt.token' });
  });

  it('should propagate NotFoundException from authService', async () => {
    authServiceMock.validateCredentials.mockRejectedValue(new NotFoundException('User not found'));

    const command = new LoginCommand('missing@example.com', 'pwd');

    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
    expect(authServiceMock.validateCredentials).toHaveBeenCalledTimes(1);
    expect(tokenServiceMock.generateToken).not.toHaveBeenCalled();
  });

  it('should propagate UnauthorizedException from authService', async () => {
    authServiceMock.validateCredentials.mockRejectedValue(new UnauthorizedException('Invalid credentials'));

    const command = new LoginCommand('user@example.com', 'badpwd');

    await expect(handler.execute(command)).rejects.toThrow(UnauthorizedException);
    expect(authServiceMock.validateCredentials).toHaveBeenCalledTimes(1);
    expect(tokenServiceMock.generateToken).not.toHaveBeenCalled();
  });

  it('should propagate unexpected errors from tokenService', async () => {
    const userView = {
      id: 'user-2',
      getEmail: () => 'u2@example.com',
      getUserType: () => 2,
    } as any;

    authServiceMock.validateCredentials.mockResolvedValue(userView);
    tokenServiceMock.generateToken.mockImplementation(() => { throw new Error('sign error'); });

    const command = new LoginCommand('u2@example.com', 'pwd');

    await expect(handler.execute(command)).rejects.toThrow(Error);
    expect(authServiceMock.validateCredentials).toHaveBeenCalledTimes(1);
    expect(tokenServiceMock.generateToken).toHaveBeenCalledTimes(1);
  });
});