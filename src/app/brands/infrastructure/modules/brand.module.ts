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

@Module({
  imports: [
    TypeOrmModule.forFeature([BrandEntity]),
    CqrsModule,
  ],
  controllers: [BrandController],
  providers: [
    // Repositorio como provider
    {
      provide: "IBrandRepository",
      useClass: BrandRepository,
    },

    //mapper
    BrandMapper,

    // Handlers
    CreateBrandHandler,
    UpdateBrandHandler,
    DeleteBrandHandler,
    GetAllBrandsHandler,
    GetBrandByIdHandler,
  ],
})
export class BrandModule {}

