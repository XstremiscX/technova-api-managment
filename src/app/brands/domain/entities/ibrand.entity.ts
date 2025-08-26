import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IBrandEntity } from "../interfaces/ibrand-entity.interface";
import { ProductEntity } from "src/app/products/domain/entities/product.entity";

@Entity('brands')
export class BrandEntity implements IBrandEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @OneToMany(() => ProductEntity, product => product.brand)
    products: ProductEntity[];

}