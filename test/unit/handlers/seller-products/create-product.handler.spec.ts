import { CreateProductHandler } from 'src/app/seller-products/application/handlers/create-product.handler';
import { CreateProductCommand } from 'src/app/seller-products/application/commands/create-product.command';
import { ProductMapper } from 'src/app/commons/mappers/products.mapper';
import { Product } from 'src/app/commons/domain/entitites/product';
import { ProductItemResponseDto } from 'src/app/commons/dtos/response-product-itme.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('CreateProductHandler (unit)', () => {
  let repoMock: { save: jest.Mock };
  let mapper: ProductMapper;
  let handler: CreateProductHandler;

  beforeEach(() => {
    repoMock = {
      save: jest.fn(),
    };
    mapper = new ProductMapper();
    handler = new CreateProductHandler(repoMock as any, mapper);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should create a product and return ProductItemResponseDto', async () => {
    const command = new CreateProductCommand(
      'My Product',
      'https://img/url.png',
      'A nice product',
      199.99,
      10,
      '{"spec":"value"}',
      'brand-id',
      'category-id',
      'seller-id'
    );

    // Make the mock repo return the same product instance it receives
    repoMock.save.mockImplementation(async (product: Product) => product);

    const result = await handler.execute(command);

    // repo.save was called once with an instance of Product
    expect(repoMock.save).toHaveBeenCalledTimes(1);
    const savedArg = repoMock.save.mock.calls[0][0];
    expect(savedArg).toBeInstanceOf(Product);

    // The handler returns the mapper's DTO for the saved product
    const expectedDto: ProductItemResponseDto = mapper.fromDomainToResponseDto(savedArg);
    expect(result).toEqual(expectedDto);
  });

  it('should propagate repository errors', async () => {
    const command = new CreateProductCommand(
      'My Product',
      'https://img/url.png',
      'A nice product',
      199.99,
      10,
      '{"spec":"value"}',
      'brand-id',
      'category-id',
      'seller-id'
    );

    repoMock.save.mockRejectedValue(new InternalServerErrorException('DB failed'));

    await expect(handler.execute(command)).rejects.toThrow(InternalServerErrorException);
    expect(repoMock.save).toHaveBeenCalledTimes(1);
  });
});