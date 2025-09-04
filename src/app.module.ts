import { Module } from '@nestjs/common';
import { BrandModule } from './app/brands/infrastructure/modules/brand.module';
import { DatabaseModule } from './app/commons/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './app/categories/infrastructure/modules/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    BrandModule, 
    DatabaseModule,
    CategoryModule],
  controllers: [],
  providers: [],
})  
export class AppModule {}
 