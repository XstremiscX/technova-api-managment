import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { ICategoryEntity } from '../interfaces/icategory-entity.interface';
import { ProductEntity } from 'src/app/products/domain/entities/product.entity';

@Entity('categories')
export class CategoryEntity implements ICategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @OneToMany(() => ProductEntity, product => product.category)
    products: ProductEntity[];
}
