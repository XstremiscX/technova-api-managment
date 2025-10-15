import { FindAllSalesHandler } from 'src/app/sales/application/handlers/find-all-sales.handler';
import { FindAllSalesQuery } from 'src/app/sales/application/queries/find-all-sales.query';
import { SaleMapper } from 'src/app/sales/presentations/mappers/sale.mapper';
import { Sale } from 'src/app/sales/domain/entities/sale';
import { SaleItemResponseDto } from 'src/app/sales/presentations/dtos/response-sale-item.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('FindAllSalesHandler (unit)', () => {
  let repoMock: { findAllSales: jest.Mock };
  let mapper: SaleMapper;
  let handler: FindAllSalesHandler;

  beforeEach(() => {
    repoMock = {
      findAllSales: jest.fn(),
    };
    mapper = new SaleMapper();
    handler = new FindAllSalesHandler(repoMock as any, mapper);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return empty array when repository returns empty list', async () => {
    const query = new FindAllSalesQuery('user-1', 'BUYER');
    repoMock.findAllSales.mockResolvedValue([]);

    const result = await handler.execute(query);

    expect(repoMock.findAllSales).toHaveBeenCalledTimes(1);
    expect(repoMock.findAllSales).toHaveBeenCalledWith('user-1', 'BUYER');
    expect(result).toEqual([]);
  });

  it('should return mapped SaleItemResponseDto array when repository returns sales', async () => {
    const domainA = new Sale('s1', 100, 2, 'buyer-1', 'seller-1', '[{product:{id:\'p1\'}}]', new Date('2025-01-01'));
    const domainB = new Sale('s2', 200, 1, 'buyer-2', 'seller-1', '[{product:{id:\'p2\'}}]', new Date('2025-01-02'));

    repoMock.findAllSales.mockResolvedValue([domainA, domainB]);

    const query = new FindAllSalesQuery('seller-1', 'SELLER');
    const result = await handler.execute(query);

    expect(repoMock.findAllSales).toHaveBeenCalledTimes(1);
    expect(repoMock.findAllSales).toHaveBeenCalledWith('seller-1', 'SELLER');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);

    const expected0: SaleItemResponseDto = mapper.toResponseDtoFromDomain(domainA);
    expect(result[0]).toEqual(expected0);

    const expected1: SaleItemResponseDto = mapper.toResponseDtoFromDomain(domainB);
    expect(result[1]).toEqual(expected1);
  });

  it('should propagate errors from repository', async () => {
    const query = new FindAllSalesQuery('user-err', 'BUYER');
    repoMock.findAllSales.mockRejectedValue(new InternalServerErrorException('DB failed'));

    await expect(handler.execute(query)).rejects.toThrow(InternalServerErrorException);
    expect(repoMock.findAllSales).toHaveBeenCalledTimes(1);
    expect(repoMock.findAllSales).toHaveBeenCalledWith('user-err', 'BUYER');
  });
});