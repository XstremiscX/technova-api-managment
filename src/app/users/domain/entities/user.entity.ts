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

    // This statement generates the relationship between the user type table and the user, bringing the ID of the user type that it is.
    @ManyToOne(() => UserTypeEntity, (type) => type.id)
    type: string;

    @Column({ type: 'boolean', default: true }) // User state false:deleted, true:active
    status: boolean;

    @Column({ type: 'boolean', default: false })
    verified: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    registration_date: Date;

    // This sentence establishes the relationship between the seller and the product being sold.
    @OneToMany(() => ProductEntity, (product) => product.seller_id)
    products: ProductEntity[];

    // This sentence establishes the relationship between the purchasing user and the purchase they made.
    @OneToMany(() => SaleEntity, (sale) => sale.buyer)
    purchases: SaleEntity[];

    // This statement generates the relationship between the selling user and the sales they have made.
    @OneToMany(() => SaleEntity, (sale) => sale.seller)
    sales: SaleEntity[];
    
}