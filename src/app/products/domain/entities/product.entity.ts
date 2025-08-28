import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { IProductEntity } from '../interfaces/iproduct-entity.interface';
import { BrandEntity } from 'src/app/brands/domain/entities/brand.entity';
import { CategoryEntity } from 'src/app/categories/domain/entities/category.entity';
import { UserEntity } from 'src/app/users/domain/entities/user.entity';

@Entity('products')
export class ProductEntity implements IProductEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar', length: 150})
    name:string;

    @Column({type: 'text'})
    image:string;

    @Column({type: 'text'})
    description:string;

    @Column({type: 'decimal'})
    price:number;

    @Column({type: 'int'})
    stock:number;

    @Column({type: 'text'})
    details: string;

    @Column({type: 'int', default: 1})
    status:number; // 0: inactive, 1: active, 2: deleted

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @ManyToOne(() => BrandEntity, (brand) => brand.id)
    brand: string;

    @ManyToOne(() => CategoryEntity, (category) => category.id)
    category: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    seller_id: string;

}