import { ProductMapper } from 'src/app/commons/mappers/products.mapper';
import { Product } from 'src/app/commons/domain/entitites/product';
import { ProductEntity } from 'src/app/commons/domain/entitites/product.entity';
import { BrandEntity } from 'src/app/brands/domain/entities/brand.entity';
import { CategoryEntity } from 'src/app/categories/domain/entities/category.entity';
import { UserEntity } from 'src/app/users/domain/entities/user.entity';
import { ProductItemResponseDto } from 'src/app/commons/dtos/response-product-itme.dto';

describe('ProductMapper', () => {
  let mapper: ProductMapper;

  beforeEach(() => {
    mapper = new ProductMapper();
  });

  it('should map from ProductEntity (relations as objects) to Product domain', () => {
    const brand = new BrandEntity();
    brand.id = 'brand-1';
    const category = new CategoryEntity();
    category.id = 'cat-1';
    const seller = new UserEntity();
    seller.id = 'seller-1';

    const entity: ProductEntity = new ProductEntity();
    entity.id = 'prod-1';
    entity.name = 'Product A';
    entity.image = 'https://img/a.png';
    entity.description = 'Desc A';
    entity.price = 123.45 as any;
    entity.stock = 10;
    entity.details = '{"k":"v"}';
    entity.status = 1;
    entity.createdAt = new Date('2025-01-01T00:00:00.000Z');
    entity.brand = brand;
    entity.category = category;
    entity.seller_id = seller;

    const domain = mapper.fromEntityToDomain(entity);

    expect(domain).toBeInstanceOf(Product);
    expect(domain.id).toBe('prod-1');
    expect(domain.getName()).toBe('Product A');
    expect(domain.getImage()).toBe('https://img/a.png');
    expect(domain.getDescription()).toBe('Desc A');
    expect(domain.getPrice()).toBe(entity.price);
    expect(domain.getStock()).toBe(10);
    expect(domain.getDetails()).toBe('{"k":"v"}');
    expect(domain.getStatus()).toBe(1);
    expect(domain.getBrand()).toBe('brand-1');
    expect(domain.getCategory()).toBe('cat-1');
    expect(domain.getSeller_id()).toBe('seller-1');
    expect(domain.createdAt.toISOString()).toBe(entity.createdAt.toISOString());
  });

  it('should map from ProductEntity with relation ids (strings) to Product domain', () => {
    const entity: ProductEntity = new ProductEntity();
    entity.id = 'prod-2';
    entity.name = 'Product B';
    entity.image = 'https://img/b.png';
    entity.description = 'Desc B';
    entity.price = 200 as any;
    entity.stock = 5;
    entity.details = 'details-b';
    entity.status = 1;
    entity.createdAt = new Date('2025-02-01T00:00:00.000Z');
    // Simulate loadRelationIds: relations represented as strings
    (entity as any).brand = 'brand-2';
    (entity as any).category = 'cat-2';
    (entity as any).seller_id = 'seller-2';

    const domain = mapper.fromEntityToDomain(entity);

    expect(domain.getBrand()).toBe('brand-2');
    expect(domain.getCategory()).toBe('cat-2');
    expect(domain.getSeller_id()).toBe('seller-2');
  });

  it('should map from Product domain to ProductEntity with nested relation entities', () => {
    const domain = new Product(
      'Domain Prod',
      'https://domain.img',
      'domain desc',
      77.7,
      3,
      '{"d":1}',
      'brand-x',
      'cat-x',
      'seller-x',
      1,
      'domain-id',
      new Date('2025-03-01T00:00:00.000Z')
    );

    const entity = mapper.fromDomainToEntity(domain);

    expect(entity).toBeInstanceOf(ProductEntity);
    expect(entity.id).toBe('domain-id');
    expect(entity.name).toBe('Domain Prod');
    expect(entity.image).toBe('https://domain.img');
    expect(entity.description).toBe('domain desc');
    expect(entity.price).toBe(domain.getPrice());
    expect(entity.stock).toBe(domain.getStock());
    expect(entity.details).toBe(domain.getDetails());
    expect(entity.status).toBe(domain.getStatus());
    expect(entity.createdAt.toISOString()).toBe(domain.createdAt.toISOString());

    expect(entity.brand).toBeInstanceOf(BrandEntity);
    expect(entity.brand.id).toBe('brand-x');

    expect(entity.category).toBeInstanceOf(CategoryEntity);
    expect(entity.category.id).toBe('cat-x');

    expect(entity.seller_id).toBeInstanceOf(UserEntity);
    expect(entity.seller_id.id).toBe('seller-x');
  });

  it('should map from domain to ProductItemResponseDto', () => {
    const domain = new Product(
      'Domain Prod 2',
      'https://domain2.img',
      'domain desc 2',
      10,
      2,
      '{"d":2}',
      'brand-y',
      'cat-y',
      'seller-y',
      1,
      'domain-id-2',
      new Date()
    );

    const dto: ProductItemResponseDto = mapper.fromDomainToResponseDto(domain);

    expect(dto).toEqual({
      id: 'domain-id-2',
      name: domain.getName(),
      image: domain.getImage(),
      price: Number(domain.getPrice()),
      stock: domain.getStock(),
      brand: domain.getBrand(),
      category: domain.getCategory(),
    });
  });
});