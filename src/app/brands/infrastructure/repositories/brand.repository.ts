import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "../../domain/entities/brand.entity";
import { Brand } from "../../domain/entities/brand";
import { Repository } from "typeorm";
import { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import { BrandMapper } from "../../presentations/mappers/brand.mapper";

@Injectable()
export class BrandRepository implements IBrandRepository {

    // Injects the repository for BrandEntity
    constructor(@InjectRepository(BrandEntity) private repo: Repository<BrandEntity>,
    private readonly mapper: BrandMapper) {}

    // Check if there is a brand with the same name to avoid duplicates.
    async existsByName(name: string, excludedId?: string): Promise<boolean> {
        
        if (excludedId) {
            const duplicated = await this.repo.findOne({ where: { name } });
            return !!(duplicated && duplicated.id !== excludedId);
        } else {
            return await this.repo.existsBy({ name });
        }
    }

    // Save a new brand by verifying that there is no other brand with the same name.
    async save(brand: Brand): Promise<Brand> {

        const exists = await this.existsByName(brand.getName());

        if (exists) throw new BussinessError("Can not duplicate a brand name.");

        const brandEntity = this.mapper.toEntityFromDomain(brand);

        const saved = await this.repo.save(brandEntity);

        return this.mapper.toDomainFromEntity(saved);

    }

    // Searches for and returns a list of all brands found in the database.
    async findAll(): Promise<Brand[]> {
        
        const entities = await this.repo.find();

        return entities.map(e => this.mapper.toDomainFromEntity(e));

    }

    // Search for a brand by ID
    async findById(id: string): Promise<Brand> {

        const brandEntity = await this.repo.findOne({where:{id:id}});

        if(!brandEntity) throw new NotFoundException(`Brand with id: ${id} not found`);

        return this.mapper.toDomainFromEntity(brandEntity);

    }

    // Update the name of a brand and verify that there is no other brand with the same name that is going to be changed.
    async update(brand: Brand): Promise<Brand> {

        const exists = await this.existsByName(brand.getName(),brand.id);

        if(exists) throw new BussinessError("Can not duplicate a brand name.");

        const entityExists = await this.repo.findOneBy({ id: brand.id });

        if (!entityExists) throw new NotFoundException("The brand to be updated does not exist.");

        entityExists.name = brand.getName();

        const updatedBrand = await this.repo.save(entityExists);

        return this.mapper.toDomainFromEntity(updatedBrand);

    }

    // Remove a brand
    async delete(id: string): Promise<void> {
        
        const entity = await this.repo.findOneBy({ id });

        if (!entity) throw new NotFoundException("Brand not found");

        await this.repo.delete(id);
    }
}
