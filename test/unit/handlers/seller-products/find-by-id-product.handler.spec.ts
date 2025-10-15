import { FindByIdProductHandler } from 'src/app/seller-products/application/handlers/find-by-id-product.handler';
import { FindByIdProductQuery } from 'src/app/seller-products/application/queries/find-by-id-product.query';
import { Product } from 'src/app/commons/domain/entitites/product';
import { ProductDetailResponseDto } from 'src/app/commons/dtos/response-product-detail.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

describe('FindByIdProductHandler (unit)', () => {
  let repoMock: { findById: jest.Mock };
  let handler: FindByIdProductHandler;

  beforeEach(() => {
    repoMock = {
      findById: jest.fn(),
    };
    handler = new FindByIdProductHandler(repoMock as any);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return ProductDetailResponseDto when product exists', async () => {
    const product = new Product(
      'Product Name',
      'https://img.url',
      'Detailed description',
      120,
      7,
      '{"spec":"value"}',
      'brand-id',
      'category-id',
      'seller-123',
      1,
      'prod-123',
      new Date('2025-01-01')
    );

    repoMock.findById.mockResolvedValue(product);

    const query = new FindByIdProductQuery('prod-123');
    const result: ProductDetailResponseDto = await handler.execute(query);

    expect(repoMock.findById).toHaveBeenCalledTimes(1);
    expect(repoMock.findById).toHaveBeenCalledWith('prod-123');

    expect(result).toEqual({
      description: product.getDescription(),
      details: product.getDetails(),
      seller_id: product.getSeller_id(),
    });
  });

  it('should propagate NotFoundException from repository', async () => {
    repoMock.findById.mockRejectedValue(new NotFoundException('Product not found'));

    const query = new FindByIdProductQuery('missing-prod');

    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
    expect(repoMock.findById).toHaveBeenCalledTimes(1);
  });

  it('should propagate unexpected errors from repository', async () => {
    repoMock.findById.mockRejectedValue(new InternalServerErrorException('DB failure'));

    const query = new FindByIdProductQuery('prod-err');

    await expect(handler.execute(query)).rejects.toThrow(InternalServerErrorException);
    expect(repoMock.findById).toHaveBeenCalledTimes(1);
  });
});