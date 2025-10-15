import { FindSaleDetailHandler } from 'src/app/sales/application/handlers/find-sale-detail.handler';
import { FindSaleDetailQuery } from 'src/app/sales/application/queries/find-sale-detail-query';
import { Sale } from 'src/app/sales/domain/entities/sale';
import { SaleDetailsResponseDto } from 'src/app/sales/presentations/dtos/response-sale-details.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

describe('FindSaleDetailHandler (unit)', () => {
  let repoMock: { findSaleDetail: jest.Mock };
  let handler: FindSaleDetailHandler;

  beforeEach(() => {
    repoMock = {
      findSaleDetail: jest.fn(),
    };
    handler = new FindSaleDetailHandler(repoMock as any, {} as any);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return SaleDetailsResponseDto when sale exists', async () => {
    const domain = new Sale(
      'sale-1',
      1000,
      2,
      'buyer-123',
      'seller-456',
      '[{product:{id:\'p1\',price:100},quantity:2}]',
      new Date('2025-01-01T00:00:00.000Z')
    );

    repoMock.findSaleDetail.mockResolvedValue(domain);

    const query = new FindSaleDetailQuery('sale-1');
    const result: SaleDetailsResponseDto = await handler.execute(query);

    expect(repoMock.findSaleDetail).toHaveBeenCalledTimes(1);
    expect(repoMock.findSaleDetail).toHaveBeenCalledWith('sale-1');

    expect(result).toEqual({
      buyer: domain.getBuyer(),
      seller: domain.getSeller(),
      details: domain.getDetails(),
    });
  });

  it('should propagate NotFoundException from repository', async () => {
    repoMock.findSaleDetail.mockRejectedValue(new NotFoundException('Sale not found'));

    const query = new FindSaleDetailQuery('missing-sale');

    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
    expect(repoMock.findSaleDetail).toHaveBeenCalledTimes(1);
    expect(repoMock.findSaleDetail).toHaveBeenCalledWith('missing-sale');
  });

  it('should propagate unexpected errors from repository', async () => {
    repoMock.findSaleDetail.mockRejectedValue(new InternalServerErrorException('DB error'));

    const query = new FindSaleDetailQuery('err-sale');

    await expect(handler.execute(query)).rejects.toThrow(InternalServerErrorException);
    expect(repoMock.findSaleDetail).toHaveBeenCalledTimes(1);
    expect(repoMock.findSaleDetail).toHaveBeenCalledWith('err-sale');
  });
});