import { DataSource } from 'typeorm';
import { UserEntity } from 'src/app/users/domain/entities/user.entity';
import { UserTypeEntity } from 'src/app/users-type/domain/entities/user-type.entity';
import { BrandEntity } from 'src/app/brands/domain/entities/brand.entity';
import { CategoryEntity } from 'src/app/categories/domain/entities/category.entity';
import * as dotenv from 'dotenv';
import { ProductEntity } from 'src/app/products/domain/entities/product.entity';
import { SaleEntity } from 'src/app/sales/domain/entities/sale.entity';
import { InitialSchemaModified1756238700669 } from './migrations/1756238700669-InitialSchemaModified';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserTypeEntity, UserEntity, BrandEntity, CategoryEntity, ProductEntity, SaleEntity],
  migrations: [InitialSchemaModified1756238700669],
  synchronize: false,
});
