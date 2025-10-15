import { UpdateProductHandler } from 'src/app/seller-products/application/handlers/update-product.handler';
import { UpdateProductCommand } from 'src/app/seller-products/application/commands/update-product.command';
import { ProductMapper } from 'src/app/commons/mappers/products.mapper';
import { Product } from 'src/app/commons/domain/entitites/product';
import { UpdateProductDto } from 'src/app/seller-products/presentations/dtos/update-product.dto';
import { ProductItemResponseDto } from 'src/app/commons/dtos/response-product-itme.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

describe('UpdateProductHandler (unit)', () => {
  let repoMock: { findById: jest.Mock; update: jest.Mock };
  let mapper: ProductMapper;
  let handler: UpdateProductHandler;

  beforeEach(() => {
    repoMock = {
      findById: jest.fn(),
      update: jest.fn(),
    };
    mapper = new ProductMapper();
    handler = new UpdateProductHandler(repoMock as any, mapper);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should update product fields and return ProductItemResponseDto', async () => {
    // existing domain product returned by repo.findById
    const existing = new Product(
      'Old Name',
      'https://old.img',
      'old desc',
      100,
      5,
      '{"old":"details"}',
      'brand-old',
      'category-old',
      'seller-1',
      1,
      'prod-1',
      new Date('2025-01-01')
    );

    // DTO with some updates
    const dto: UpdateProductDto = {
      name: 'New Name',
      image: 'https://new.img',
      description: 'new desc',
      price: 150,
      stock: 8,
      details: '{"new":"details"}',
      brand: 'brand-new',
      category: 'category-new',
    };

    repoMock.findById.mockResolvedValue(existing);

    // repo.update returns the product passed (simulate persistence)
    repoMock.update.mockImplementation(async (product: Product) => product);

    const command = new UpdateProductCommand('prod-1', 'seller-1', dto);

    const result = await handler.execute(command);

    expect(repoMock.findById).toHaveBeenCalledTimes(1);
    expect(repoMock.findById).toHaveBeenCalledWith('prod-1');

    expect(repoMock.update).toHaveBeenCalledTimes(1);
    const updatedArg = repoMock.update.mock.calls[0][0];
    expect(updatedArg).toBeInstanceOf(Product);

    // Validate that domain mutations occurred
    expect(updatedArg.getName()).toBe('New Name');
    expect(updatedArg.getImage()).toBe('https://new.img');
    expect(updatedArg.getDescription()).toBe('new desc');
    expect(updatedArg.getPrice()).toBe(150);
    expect(updatedArg.getStock()).toBe(8);
    expect(updatedArg.getDetails()).toBe('{"new":"details"}');
    expect(updatedArg.getBrand()).toBe('brand-new');
    expect(updatedArg.getCategory()).toBe('category-new');

    // Handler returns mapped DTO
    const expectedDto: ProductItemResponseDto = mapper.fromDomainToResponseDto(updatedArg);
    expect(result).toEqual(expectedDto);
  });

  it('should only apply provided fields (partial update)', async () => {
    const existing = new Product(
      'Keep Name',
      'https://keep.img',
      'keep desc',
      50,
      3,
      '{"keep":"details"}',
      'brand-keep',
      'category-keep',
      'seller-1',
      1,
      'prod-2',
      new Date()
    );

    const dto: UpdateProductDto = {
      // only change price and stock
      price: 75,
      stock: 10,
    };

    repoMock.findById.mockResolvedValue(existing);
    repoMock.update.mockImplementation(async (p: Product) => p);

    const command = new UpdateProductCommand('prod-2', 'seller-1', dto);
    const result = await handler.execute(command);

    const updatedArg = repoMock.update.mock.calls[0][0];
    expect(updatedArg.getName()).toBe('Keep Name'); // unchanged
    expect(updatedArg.getPrice()).toBe(75);
    expect(updatedArg.getStock()).toBe(10);

    const expectedDto = mapper.fromDomainToResponseDto(updatedArg);
    expect(result).toEqual(expectedDto);
  });

  it('should propagate NotFoundException from repository.findById', async () => {
    repoMock.findById.mockRejectedValue(new NotFoundException('Product not found'));

    const dto: UpdateProductDto = { name: 'X' };
    const command = new UpdateProductCommand('missing', 'seller-1', dto);

    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
    expect(repoMock.findById).toHaveBeenCalledTimes(1);
    expect(repoMock.update).not.toHaveBeenCalled();
  });

  it('should propagate errors from repository.update', async () => {
    const existing = new Product(
      'Name',
      'img',
      'desc',
      10,
      1,
      '{}',
      'brand',
      'category',
      'seller-1',
      1,
      'prod-3',
      new Date()
    );

    repoMock.findById.mockResolvedValue(existing);
    repoMock.update.mockRejectedValue(new InternalServerErrorException('DB failed'));

    const dto: UpdateProductDto = { price: 20 };
    const command = new UpdateProductCommand('prod-3', 'seller-1', dto);

    await expect(handler.execute(command)).rejects.toThrow(InternalServerErrorException);
    expect(repoMock.findById).toHaveBeenCalledTimes(1);
    expect(repoMock.update).toHaveBeenCalledTimes(1);
  });
});