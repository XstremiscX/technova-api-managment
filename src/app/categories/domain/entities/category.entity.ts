import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { ProductEntity } from 'src/app/commons/domain/entitites/product.entity';

@Entity('categories')
export class CategoryEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    // This statement creates the relationship between the products table and the categories table.
    @OneToMany(() => ProductEntity, product => product.category)
    products: ProductEntity[];
}
