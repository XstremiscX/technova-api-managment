import { AuthService } from 'src/app/auth/infrastructure/services/auth.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('AuthService (unit)', () => {
  let userRepoMock: { findByEmail: jest.Mock };
  let passwordServiceMock: { verifyPassword: jest.Mock };
  let service: AuthService;

  beforeEach(() => {
    userRepoMock = { findByEmail: jest.fn() };
    passwordServiceMock = { verifyPassword: jest.fn() };
    service = new AuthService(userRepoMock as any, passwordServiceMock as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return LoginUserView when credentials valid', async () => {
    const loginView = {
      id: 'u1',
      getEmail: () => 'u1@example.com',
      getHashedPassword: () => 'hashed',
      getUserType: () => 1,
    } as any;

    userRepoMock.findByEmail.mockResolvedValue(loginView);
    passwordServiceMock.verifyPassword.mockReturnValue(true);

    const result = await service.validateCredentials('u1@example.com', 'plainpwd');

    expect(userRepoMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(userRepoMock.findByEmail).toHaveBeenCalledWith('u1@example.com');
    expect(passwordServiceMock.verifyPassword).toHaveBeenCalledTimes(1);
    expect(passwordServiceMock.verifyPassword).toHaveBeenCalledWith('plainpwd', 'hashed');
    expect(result).toBe(loginView);
  });

  it('should throw NotFoundException when user not found', async () => {
    userRepoMock.findByEmail.mockResolvedValue(undefined);

    await expect(service.validateCredentials('missing@example.com', 'pwd')).rejects.toThrow(NotFoundException);
    expect(userRepoMock.findByEmail).toHaveBeenCalledTimes(1);
  });

  it('should throw UnauthorizedException when password invalid', async () => {
    const loginView = {
      id: 'u2',
      getEmail: () => 'u2@example.com',
      getHashedPassword: () => 'hashed2',
      getUserType: () => 1,
    } as any;

    userRepoMock.findByEmail.mockResolvedValue(loginView);
    passwordServiceMock.verifyPassword.mockReturnValue(false);

    await expect(service.validateCredentials('u2@example.com', 'badpwd')).rejects.toThrow(UnauthorizedException);
    expect(passwordServiceMock.verifyPassword).toHaveBeenCalledTimes(1);
  });
});