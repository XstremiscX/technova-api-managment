import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { IUserEntity } from '../interfaces/iuser-entity.interface';
import { UserTypeEntity } from './user-type.entity';
import { ProductEntity } from 'src/app/products/domain/entities/product.entity';
import { SaleEntity } from 'src/app/sales/domain/entities/sale.entity';

@Entity('users')
export class UserEntity implements IUserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 15 })
    phone: string;

    @Column({ type: 'varchar', length: 500 })
    address: string;

    @Column({ type: 'text' })
    password: string;

    @ManyToOne(() => UserTypeEntity, (type) => type.id)
    type: string;

    @Column({ type: 'int', default: 1 }) // User state 0:inactive, 1:active
    status: number;

    @Column({ type: 'boolean', default: false })
    verified: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    registration_date: Date;

    @OneToMany(() => ProductEntity, (product) => product.seller_id)
    products: ProductEntity[];

    @OneToMany(() => SaleEntity, (sale) => sale.buyer)
    purchases: SaleEntity[];

    @OneToMany(() => SaleEntity, (sale) => sale.seller)
    sales: SaleEntity[];
}
