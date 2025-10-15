import { DeleteProductHandler } from 'src/app/seller-products/application/handlers/delete-product.handler';
import { DeleteProductCommand } from 'src/app/seller-products/application/commands/delete-product.command';
import { DeletedResult } from 'src/app/commons/utils/enums/deleted-resutls.enum';
import { DeleteResponseDto } from 'src/app/commons/dtos/response-deleted-domain.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

describe('DeleteProductHandler (unit)', () => {
  let repoMock: { softDelete: jest.Mock };
  let handler: DeleteProductHandler;

  beforeEach(() => {
    repoMock = {
      softDelete: jest.fn(),
    };
    handler = new DeleteProductHandler(repoMock as any);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should call softDelete and return Deleted response DTO', async () => {
    // Arrange
    const command = new DeleteProductCommand('prod-1', 'seller-1');
    repoMock.softDelete.mockResolvedValue(undefined);

    // Act
    const result: DeleteResponseDto = await handler.execute(command);

    // Assert
    expect(repoMock.softDelete).toHaveBeenCalledTimes(1);
    expect(repoMock.softDelete).toHaveBeenCalledWith('prod-1', 'seller-1');
    expect(result).toEqual({
      result: DeletedResult.DELETED,
      message: 'Product Deleted Successfully.',
    });
  });

  it('should propagate NotFoundException from repository', async () => {
    // Arrange
    const command = new DeleteProductCommand('missing-prod', 'seller-1');
    repoMock.softDelete.mockRejectedValue(new NotFoundException('Product for delete not found.'));

    // Act + Assert
    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
    expect(repoMock.softDelete).toHaveBeenCalledTimes(1);
  });

  it('should propagate InternalServerErrorException from repository', async () => {
    // Arrange
    const command = new DeleteProductCommand('prod-2', 'seller-2');
    repoMock.softDelete.mockRejectedValue(new InternalServerErrorException('DB error during delete'));

    // Act + Assert
    await expect(handler.execute(command)).rejects.toThrow(InternalServerErrorException);
    expect(repoMock.softDelete).toHaveBeenCalledTimes(1);
  });
});