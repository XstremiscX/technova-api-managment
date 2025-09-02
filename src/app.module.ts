import { Module } from '@nestjs/common';
import { BrandModule } from './app/brands/infrastructure/modules/brand.module';
import { DatabaseModule } from './app/commons/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    BrandModule, 
    DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
 