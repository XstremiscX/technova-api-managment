import { SaveSaleHandler } from 'src/app/sales/application/handlers/save-sale.handler';
import { SaveSaleCommand } from 'src/app/sales/application/commands/save-sale.command';
import { SaleMapper } from 'src/app/sales/presentations/mappers/sale.mapper';
import { Sale } from 'src/app/sales/domain/entities/sale';
import { SaleItemResponseDto } from 'src/app/sales/presentations/dtos/response-sale-item.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('SaveSaleHandler (unit)', () => {
  let repoMock: { saveSale: jest.Mock };
  let mapper: SaleMapper;
  let handler: SaveSaleHandler;

  beforeEach(() => {
    repoMock = {
      saveSale: jest.fn(),
    };
    mapper = new SaleMapper();
    handler = new SaveSaleHandler(repoMock as any, mapper);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should create a Sale, call repository.saveSale and return SaleItemResponseDto', async () => {
    const command = new SaveSaleCommand(500, 2, 'buyer-1', 'seller-1', '[{product:{id:\'p1\',price:250},quantity:2}]');

    // Simulate repository returning the same domain sale (mapper expects domain)
    repoMock.saveSale.mockImplementation(async (sale: Sale) => sale);

    const result: SaleItemResponseDto = await handler.execute(command);

    // repo.saveSale called once with a Sale instance
    expect(repoMock.saveSale).toHaveBeenCalledTimes(1);
    const savedArg = repoMock.saveSale.mock.calls[0][0];
    expect(savedArg).toBeInstanceOf(Sale);

    // mapper produced DTO matches returned result
    const expectedDto: SaleItemResponseDto = mapper.toResponseDtoFromDomain(savedArg);
    expect(result).toEqual(expectedDto);

    // validate some fields from created domain object (amount, quantity, buyer/seller)
    expect(savedArg.getAmount()).toBe(500);
    expect(savedArg.getQuantity()).toBe(2);
    expect(savedArg.getBuyer()).toBe('buyer-1');
    expect(savedArg.getSeller()).toBe('seller-1');
  });

  it('should propagate NotFoundException from repository', async () => {
    const command = new SaveSaleCommand(100, 1, 'b1', 's1', '[]');
    repoMock.saveSale.mockRejectedValue(new NotFoundException('Sale could not be saved'));

    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
    expect(repoMock.saveSale).toHaveBeenCalledTimes(1);
  });

  it('should propagate unexpected errors from repository', async () => {
    const command = new SaveSaleCommand(1000, 5, 'b2', 's2', '[]');
    repoMock.saveSale.mockRejectedValue(new InternalServerErrorException('DB error'));

    await expect(handler.execute(command)).rejects.toThrow(InternalServerErrorException);
    expect(repoMock.saveSale).toHaveBeenCalledTimes(1);
  });
});