import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { ProductEntity } from 'src/app/commons/domain/entitites/product.entity';

// Persistence entity representing the ‘categories’ table in the database
@Entity('categories')
export class CategoryEntity{
    
    // Automatically generated unique identifier
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Category name, limited to 100 characters
    @Column({type: 'varchar', length: 100 })
    name: string;

    // Category description
    @Column({ type: 'text' })
    description: string;

    // One-to-many relationship with products: a category can have several products
    @OneToMany(() => ProductEntity, product => product.category)
    products: ProductEntity[];
}
