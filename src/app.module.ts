import { Module } from '@nestjs/common';
import { BrandModule } from './app/brands/infrastructure/modules/brand.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './app/users/domain/entities/user.entity';
import { UserTypeEntity } from './app/users-type/domain/entities/user-type.entity';
import { BrandEntity } from './app/brands/domain/entities/brand.entity';
import { CategoryEntity } from './app/categories/domain/entities/category.entity';
import { ProductEntity } from './app/products/domain/entities/product.entity';
import { SaleEntity } from './app/sales/domain/entities/sale.entity';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
  imports: [BrandModule,TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserTypeEntity, UserEntity, BrandEntity, CategoryEntity, ProductEntity, SaleEntity],
      synchronize: false,
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
 