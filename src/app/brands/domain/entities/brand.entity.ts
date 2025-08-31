import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductEntity } from "src/app/products/domain/entities/product.entity";

@Entity('brands')
export class BrandEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    // This statement creates the relationship between the products table and the brands table.
    @OneToMany(() => ProductEntity, product => product.brand)
    products: ProductEntity[];

}