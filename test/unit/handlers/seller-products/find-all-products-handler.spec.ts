import { FindAllProductHandler } from 'src/app/seller-products/application/handlers/find-all-products.handler';
import { FindAllProductsQuery } from 'src/app/seller-products/application/queries/find-all-products.query';
import { ProductMapper } from 'src/app/commons/mappers/products.mapper';
import { Product } from 'src/app/commons/domain/entitites/product';
import { ProductItemResponseDto } from 'src/app/commons/dtos/response-product-itme.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('FindAllProductHandler (unit)', () => {
  let repoMock: { findAll: jest.Mock };
  let mapper: ProductMapper;
  let handler: FindAllProductHandler;

  beforeEach(() => {
    repoMock = {
      findAll: jest.fn(),
    };
    mapper = new ProductMapper();
    handler = new FindAllProductHandler(repoMock as any, mapper);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return empty array when repository returns empty list', async () => {
    const query = new FindAllProductsQuery('seller-1');
    repoMock.findAll.mockResolvedValue([]);

    const result = await handler.execute(query);

    expect(repoMock.findAll).toHaveBeenCalledTimes(1);
    expect(repoMock.findAll).toHaveBeenCalledWith('seller-1');
    expect(result).toEqual([]);
  });

  it('should return mapped ProductItemResponseDto array when repository returns products', async () => {
    const sellerId = 'seller-2';
    const domainA = new Product(
      'Prod A',
      'img-a',
      'desc-a',
      100,
      5,
      '{"a":1}',
      'brand-a',
      'category-a',
      sellerId,
      1,
      'prod-a',
      new Date('2025-01-01')
    );
    const domainB = new Product(
      'Prod B',
      'img-b',
      'desc-b',
      200,
      2,
      '{"b":2}',
      'brand-b',
      'category-b',
      sellerId,
      1,
      'prod-b',
      new Date('2025-01-02')
    );

    repoMock.findAll.mockResolvedValue([domainA, domainB]);

    const query = new FindAllProductsQuery(sellerId);
    const result = await handler.execute(query);

    expect(repoMock.findAll).toHaveBeenCalledTimes(1);
    expect(repoMock.findAll).toHaveBeenCalledWith(sellerId);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);

    // Validate mapping correctness for first item
    const expected0: ProductItemResponseDto = mapper.fromDomainToResponseDto(domainA);
    expect(result[0]).toEqual(expected0);

    // Validate mapping correctness for second item
    const expected1: ProductItemResponseDto = mapper.fromDomainToResponseDto(domainB);
    expect(result[1]).toEqual(expected1);
  });

  it('should propagate errors from repository', async () => {
    const query = new FindAllProductsQuery('seller-3');
    repoMock.findAll.mockRejectedValue(new InternalServerErrorException('DB failed'));

    await expect(handler.execute(query)).rejects.toThrow(InternalServerErrorException);
    expect(repoMock.findAll).toHaveBeenCalledTimes(1);
  });
});