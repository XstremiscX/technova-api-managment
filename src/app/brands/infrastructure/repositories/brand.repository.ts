import { Injectable, NotFoundException } from "@nestjs/common";
import { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "../../domain/entities/brand.entity";
import { Brand } from "../../domain/entities/brand";
import { BrandMapper } from "../../application/mappers/brand.mapper";
import { Repository } from "typeorm";

@Injectable()
export class BrandRepository implements IBrandRepository{


    constructor(@InjectRepository(BrandEntity) private repo: Repository<BrandEntity>){};

    async createBrand(brand: Brand): Promise<void> {

        const entity = BrandMapper.toEntity(brand);

        await this.repo.save(entity);
    }

    async listAllBrands(): Promise<Brand[] | null> {
        
        const entityList = await this.repo.find();

        return BrandMapper.toDomainList(entityList);
        
    }   

    async getBrandById(id: string): Promise<Brand | null> {

        const entity = await this.repo.findOneBy({id});

        return entity ? BrandMapper.toDomain(entity) : null;

    }

    async updateBrand(brand: Brand): Promise<Brand> {

        const entityExists = await this.repo.findOneBy({id: brand.id});

        if(!entityExists) throw new NotFoundException("The brand to be updated does not exist.");

        entityExists.name = brand.name;

        const updatedBrand = await this.repo.save(entityExists);

        return BrandMapper.toDomain(updatedBrand);
        
    }

    async deleteBrand(brand: Brand): Promise<void> {
        
        const entity = BrandMapper.toEntity(brand);
        
        this.repo.remove(entity);

    }

}