import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductEntity } from "src/app/commons/domain/entitites/product.entity";

// Persistence entity representing the 'brands' table in the database.
@Entity('brands')
export class BrandEntity{
    
    // Primary key of the table, of type UUID
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Column that stores the brand name
    @Column({ type: 'varchar', length: 150 })
    name: string;

    // This statement creates the relationship between the products table and the brands table.
    @OneToMany(() => ProductEntity, product => product.brand)
    products: ProductEntity[];

}