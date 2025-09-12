import { Module } from '@nestjs/common';
import { BrandModule } from './app/brands/infrastructure/modules/brand.module';
import { DatabaseModule } from './app/commons/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './app/categories/infrastructure/modules/category.module';
import { UsersModule } from './app/users/infrastructure/modules/users.module';
import { User } from './app/users/domain/entities/user';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    BrandModule, 
    DatabaseModule,
    CategoryModule,
    UsersModule],
  controllers: [],
  providers: [],
})  
export class AppModule {}
 