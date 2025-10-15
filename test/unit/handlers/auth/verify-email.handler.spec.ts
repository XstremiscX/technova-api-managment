import { VerifyEmailCommandHanlder } from 'src/app/auth/application/handlers/verify-email.handler';
import { VerifyEmailCommand } from 'src/app/auth/application/commands/verify-email.command';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('VerifyEmailCommandHanlder (unit)', () => {
  let userRepoMock: { verifyUserEmail: jest.Mock };
  let handler: VerifyEmailCommandHanlder;

  beforeEach(() => {
    userRepoMock = { verifyUserEmail: jest.fn() };
    handler = new VerifyEmailCommandHanlder(userRepoMock as any);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should call repository and return success object when verification succeeds', async () => {
    const command = new VerifyEmailCommand('user-1');
    const successResponse = { verificationSucceded: true, message: 'Email verification completed successfully' };

    userRepoMock.verifyUserEmail.mockResolvedValue(successResponse);

    const result = await handler.execute(command);

    expect(userRepoMock.verifyUserEmail).toHaveBeenCalledTimes(1);
    expect(userRepoMock.verifyUserEmail).toHaveBeenCalledWith('user-1');
    expect(result).toEqual(successResponse);
  });

  it('should return already-verified object when repository indicates previously verified', async () => {
    const command = new VerifyEmailCommand('user-2');
    const alreadyVerified = { VerificationSucceded: false, message: "The user's email address has already been verified." };

    userRepoMock.verifyUserEmail.mockResolvedValue(alreadyVerified);

    const result = await handler.execute(command);

    expect(userRepoMock.verifyUserEmail).toHaveBeenCalledTimes(1);
    expect(userRepoMock.verifyUserEmail).toHaveBeenCalledWith('user-2');
    expect(result).toEqual(alreadyVerified);
  });

  it('should propagate NotFoundException from repository', async () => {
    const command = new VerifyEmailCommand('missing-user');
    userRepoMock.verifyUserEmail.mockRejectedValue(new NotFoundException('User Not found'));

    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
    expect(userRepoMock.verifyUserEmail).toHaveBeenCalledTimes(1);
    expect(userRepoMock.verifyUserEmail).toHaveBeenCalledWith('missing-user');
  });

  it('should propagate unexpected errors from repository', async () => {
    const command = new VerifyEmailCommand('err-user');
    userRepoMock.verifyUserEmail.mockRejectedValue(new Error('unexpected'));

    await expect(handler.execute(command)).rejects.toThrow(Error);
    expect(userRepoMock.verifyUserEmail).toHaveBeenCalledTimes(1);
    expect(userRepoMock.verifyUserEmail).toHaveBeenCalledWith('err-user');
  });
});