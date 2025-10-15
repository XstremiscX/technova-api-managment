import { FindAllPublicProductsHandler } from 'src/app/public-products/application/handlers/find-all-public-products.handler';
import { FindAllPublicProductsQuery } from 'src/app/public-products/application/queries/find-all-public-products.query';
import { ProductMapper } from 'src/app/commons/mappers/products.mapper';
import { Product } from 'src/app/commons/domain/entitites/product';
import { FiltersDto } from 'src/app/public-products/presentation/dto/filters.dto';
import { ProductItemResponseDto } from 'src/app/commons/dtos/response-product-itme.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('FindAllPublicProductsHandler (unit)', () => {
  let repoMock: { findAll: jest.Mock };
  let mapper: ProductMapper;
  let handler: FindAllPublicProductsHandler;

  beforeEach(() => {
    repoMock = {
      findAll: jest.fn(),
    };
    mapper = new ProductMapper();
    handler = new FindAllPublicProductsHandler(repoMock as any, mapper);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return empty array when repository returns empty list', async () => {
    const filters: FiltersDto = {};
    const query = new FindAllPublicProductsQuery(filters);

    repoMock.findAll.mockResolvedValue([]);

    const result = await handler.execute(query);

    expect(repoMock.findAll).toHaveBeenCalledTimes(1);
    expect(repoMock.findAll).toHaveBeenCalledWith(filters);
    expect(result).toEqual([]);
  });

  it('should return mapped ProductItemResponseDto array when repository returns products', async () => {
    const sellerId = 'seller-abc';
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

    const filters: FiltersDto = { name: 'Prod' };
    repoMock.findAll.mockResolvedValue([domainA, domainB]);

    const query = new FindAllPublicProductsQuery(filters);
    const result = await handler.execute(query);

    expect(repoMock.findAll).toHaveBeenCalledTimes(1);
    expect(repoMock.findAll).toHaveBeenCalledWith(filters);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);

    const expected0: ProductItemResponseDto = mapper.fromDomainToResponseDto(domainA);
    expect(result[0]).toEqual(expected0);

    const expected1: ProductItemResponseDto = mapper.fromDomainToResponseDto(domainB);
    expect(result[1]).toEqual(expected1);
  });

  it('should propagate errors from repository', async () => {
    const filters: FiltersDto = { categoryId: 'cat-1' };
    const query = new FindAllPublicProductsQuery(filters);

    repoMock.findAll.mockRejectedValue(new InternalServerErrorException('DB failed'));

    await expect(handler.execute(query)).rejects.toThrow(InternalServerErrorException);
    expect(repoMock.findAll).toHaveBeenCalledTimes(1);
    expect(repoMock.findAll).toHaveBeenCalledWith(filters);
  });
});