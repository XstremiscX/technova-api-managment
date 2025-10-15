import { TokenService } from 'src/app/auth/infrastructure/services/token.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from 'src/app/auth/presentation/dtos/token-payload.dto';

describe('TokenService (unit)', () => {
  let jwtServiceMock: { sign: jest.Mock; verify: jest.Mock };
  let service: TokenService;

  beforeEach(() => {
    jwtServiceMock = { sign: jest.fn(), verify: jest.fn() };
    service = new TokenService(jwtServiceMock as any);
  });

  it('should generate token with payload mapping', () => {
    jwtServiceMock.sign.mockReturnValue('signed.token.example');

    const token = service.generateToken('id-1', 'a@b.com', 1);

    expect(jwtServiceMock.sign).toHaveBeenCalledTimes(1);
    const expectedPayload = expect.objectContaining({
      userId: 'id-1',
      userEmail: 'a@b.com',
    });
    expect(jwtServiceMock.sign).toHaveBeenCalledWith(expectedPayload);
    expect(token).toBe('signed.token.example');
  });

  it('should verify token and return payload', () => {
    const payload: TokenPayloadDto = { userId: 'id-2', userEmail: 'x@y.com', userType: '1' };
    jwtServiceMock.verify.mockReturnValue(payload);

    const result = service.verifyToken('some.token');

    expect(jwtServiceMock.verify).toHaveBeenCalledTimes(1);
    expect(jwtServiceMock.verify).toHaveBeenCalledWith('some.token');
    expect(result).toEqual(payload);
  });

  it('should propagate errors from jwtService.verify', () => {
    jwtServiceMock.verify.mockImplementation(() => { throw new Error('invalid token'); });

    expect(() => service.verifyToken('bad.token')).toThrow(Error);
    expect(jwtServiceMock.verify).toHaveBeenCalledTimes(1);
  });
});