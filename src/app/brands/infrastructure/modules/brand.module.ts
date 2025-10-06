import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { BrandEntity } from '../../domain/entities/brand.entity';
import { BrandController } from '../../presentations/controllers/brand.controller';

import { BrandRepository } from '../repositories/brand.repository';

import { UpdateBrandHandler } from '../../application/handlers/update-brand.handler';
import { DeleteBrandHandler } from '../../application/handlers/delete-brand.handler';
import { GetAllBrandsHandler } from '../../application/handlers/get-all-brands.handler';
import { GetBrandByIdHandler } from '../../application/handlers/get-by-id-brand.handler';
import { CreateBrandHandler } from '../../application/handlers/create-brand.handler';

import { BrandMapper } from '../../presentations/mappers/brand.mapper';
import { AuthModule } from 'src/app/auth/infrastructure/modules/auth.module';

@Module({
  imports: [
    // Import the brand entity for operations with TypeORM
    TypeOrmModule.forFeature([BrandEntity]),
    // Enable the CQRS pattern
    CqrsModule,
    // Authentication module to protect endpoints
    AuthModule
  ],
  controllers: [BrandController],
  providers: [
    // Injecting the repository using its interface
    {
      provide: "IBrandRepository",
      useClass: BrandRepository,
    },

    // Mapper for transforming between domain entities, persistence, and DTOs
    BrandMapper,

    // CQRS Handlers
    CreateBrandHandler,
    UpdateBrandHandler,
    DeleteBrandHandler,
    GetAllBrandsHandler,
    GetBrandByIdHandler,
  ],
})
export class BrandModule {}

