import { BrandEntity } from "src/app/brands/domain/entities/brand.entity";
import { CategoryEntity } from "src/app/categories/domain/entities/category.entity";
import { UserEntity } from "src/app/users/domain/entities/user.entity";

export interface IProductEntity {
    id:string;
    name:string;
    image:string;
    description:string;
    category:CategoryEntity;
    brand:BrandEntity;
    price:number;
    stock:number;
    details:string;
    status:number; // 0: inactive, 1: active, 2: deleted
    createdAt: Date;
    seller_id:UserEntity;
}
