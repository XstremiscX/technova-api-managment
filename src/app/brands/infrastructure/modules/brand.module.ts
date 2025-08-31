import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { BrandEntity } from '../../domain/entities/brand.entity';
import { BrandController } from '../../presentations/controllers/brand.controller';

import { BrandRepository } from '../repositories/brand.repository';
import type { IBrandRepository } from '../../domain/interfaces/ibrand-repository.interface';

import { UpdateBrandHandler } from '../../application/handlers/update-brand.handler';
import { DeleteBrandhandler } from '../../application/handlers/delete-brand.handler';
import { GetAllBrandsHandler } from '../../application/handlers/get-all-brands.handler';
import { GetBrandByIdHandler } from '../../application/handlers/get-brand-by-id.handler';
import { CreateBrandHandler } from '../../application/handlers/create-brand.handler';
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

    // Handlers
    CreateBrandHandler,
    UpdateBrandHandler,
    DeleteBrandhandler,
    GetAllBrandsHandler,
    GetBrandByIdHandler,
  ],
})
export class BrandModule {}

