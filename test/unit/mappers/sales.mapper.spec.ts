import { SaleMapper } from 'src/app/sales/presentations/mappers/sale.mapper';
import { Sale } from 'src/app/sales/domain/entities/sale';
import { SaleEntity } from 'src/app/sales/domain/entities/sale.entity';
import { UserEntity } from 'src/app/users/domain/entities/user.entity';
import { SaleItemResponseDto } from 'src/app/sales/presentations/dtos/response-sale-item.dto';

describe('SaleMapper', () => {
  let mapper: SaleMapper;

  beforeEach(() => {
    mapper = new SaleMapper();
  });

  it('should map SaleEntity with relation objects to Sale domain', () => {
    const buyer = new UserEntity();
    buyer.id = 'buyer-1';
    const seller = new UserEntity();
    seller.id = 'seller-1';

    const entity: SaleEntity = new SaleEntity();
    entity.id = 'sale-1';
    entity.amount = 123.45 as any;
    entity.quantity = 3;
    entity.details = '[{product:{id:\'p1\'}}]';
    entity.date = new Date('2025-01-01T00:00:00.000Z');
    entity.buyer = buyer;
    entity.seller = seller;

    const domain = mapper.toDomainFromEntity(entity);

    expect(domain).toBeInstanceOf(Sale);
    expect(domain.id).toBe('sale-1');
    expect(domain.getAmount()).toBe(entity.amount);
    expect(domain.getQuantity()).toBe(entity.quantity);
    expect(domain.getDetails()).toBe(entity.details);
    expect(domain.getDate().toISOString()).toBe(entity.date.toISOString());
    expect(domain.getBuyer()).toBe('buyer-1');
    expect(domain.getSeller()).toBe('seller-1');
  });

  it('should map SaleEntity with relation ids (strings) to Sale domain', () => {
    const entity: SaleEntity = new SaleEntity();
    entity.id = 'sale-2';
    entity.amount = 50 as any;
    entity.quantity = 1;
    entity.details = '[]';
    entity.date = new Date('2025-02-02T00:00:00.000Z');
    // simulate loadRelationIds: relations as strings
    (entity as any).buyer = 'buyer-2';
    (entity as any).seller = 'seller-2';

    const domain = mapper.toDomainFromEntity(entity);

    expect(domain.getBuyer()).toBe('buyer-2');
    expect(domain.getSeller()).toBe('seller-2');
  });

  it('should map Sale domain to SaleEntity with nested UserEntity relations', () => {
    const domain = new Sale(
      'sale-3',
      999.99,
      5,
      'buyer-3',
      'seller-3',
      '[{product:{id:\'p3\'}}]',
      new Date('2025-03-03T00:00:00.000Z')
    );

    const entity = mapper.toEntityFromDomain(domain);

    expect(entity).toBeInstanceOf(SaleEntity);
    expect(entity.id).toBe('sale-3');
    expect(entity.amount).toBe(domain.getAmount());
    expect(entity.quantity).toBe(domain.getQuantity());
    expect(entity.details).toBe(domain.getDetails());
    // buyer and seller should be UserEntity instances with proper ids
    expect((entity.buyer as UserEntity).id).toBe('buyer-3');
    expect((entity.seller as UserEntity).id).toBe('seller-3');
  });

  it('should map Sale domain to SaleItemResponseDto', () => {
    const domain = new Sale(
      'sale-4',
      10,
      2,
      'buyer-4',
      'seller-4',
      '[]',
      new Date('2025-04-04T00:00:00.000Z')
    );

    const dto: SaleItemResponseDto = mapper.toResponseDtoFromDomain(domain);

    expect(dto).toEqual({
      id: 'sale-4',
      amount: domain.getAmount(),
      date: domain.getDate(),
      quantity: domain.getQuantity(),
    });
  });
});