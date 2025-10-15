import { FindByIdPublicProductHandler } from 'src/app/public-products/application/handlers/find-by-id-public-products.handler';
import { FindByIdPublicProductQuery } from 'src/app/public-products/application/queries/find-by-id-public-product.query';
import { ProductMapper } from 'src/app/commons/mappers/products.mapper';
import { Product } from 'src/app/commons/domain/entitites/product';
import { ProductItemResponseDto } from 'src/app/commons/dtos/response-product-itme.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

describe('FindByIdPublicProductHandler (unit)', () => {
  let repoMock: { findById: jest.Mock };
  let mapper: ProductMapper;
  let handler: FindByIdPublicProductHandler;

  beforeEach(() => {
    repoMock = {
      findById: jest.fn(),
    };
    mapper = new ProductMapper();
    handler = new FindByIdPublicProductHandler(repoMock as any, mapper);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return ProductItemResponseDto when product exists', async () => {
    const domain = new Product(
      'Public Product',
      'https://img.public',
      'public description',
      150,
      12,
      '{"spec":"v"}',
      'brand-public',
      'category-public',
      'seller-public',
      1,
      'prod-public-1',
      new Date('2025-01-10T00:00:00.000Z')
    );

    repoMock.findById.mockResolvedValue(domain);

    const query = new FindByIdPublicProductQuery('prod-public-1');
    const result: ProductItemResponseDto = await handler.execute(query);

    expect(repoMock.findById).toHaveBeenCalledTimes(1);
    expect(repoMock.findById).toHaveBeenCalledWith('prod-public-1');

    const expected: ProductItemResponseDto = mapper.fromDomainToResponseDto(domain);
    expect(result).toEqual(expected);
  });

  it('should propagate NotFoundException from repository', async () => {
    repoMock.findById.mockRejectedValue(new NotFoundException('Product not found'));

    const query = new FindByIdPublicProductQuery('missing-id');

    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
    expect(repoMock.findById).toHaveBeenCalledTimes(1);
    expect(repoMock.findById).toHaveBeenCalledWith('missing-id');
  });

  it('should propagate unexpected errors from repository', async () => {
    repoMock.findById.mockRejectedValue(new InternalServerErrorException('DB error'));

    const query = new FindByIdPublicProductQuery('err-id');

    await expect(handler.execute(query)).rejects.toThrow(InternalServerErrorException);
    expect(repoMock.findById).toHaveBeenCalledTimes(1);
    expect(repoMock.findById).toHaveBeenCalledWith('err-id');
  });
});