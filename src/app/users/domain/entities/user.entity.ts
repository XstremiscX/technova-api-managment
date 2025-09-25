import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { ProductEntity } from 'src/app/seller-products/domain/entities/product.entity';
import { SaleEntity } from 'src/app/sales/domain/entities/sale.entity';
import { UserTypeEnum } from 'src/app/commons/utils/enums/users-type.enum';

@Entity('users')
export class UserEntity{
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

    @Column({type:'int'})    
    type: UserTypeEnum;

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