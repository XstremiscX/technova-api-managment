import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "../../domain/entities/brand.entity";
import { Brand } from "../../domain/entities/brand";
import { Repository } from "typeorm";
import { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";

@Injectable()
export class BrandRepository implements IBrandRepository {

    // Injects the repository for BrandEntity
    constructor(@InjectRepository(BrandEntity) private repo: Repository<BrandEntity>) {}

    async existsByName(name: string, excludedId?: string): Promise<boolean> {
        // Checks if a brand with the same name exists, optionally excluding a specific ID (used during updates)
        if (excludedId) {
            const duplicated = await this.repo.findOne({ where: { name } });
            return !!(duplicated && duplicated.id !== excludedId);
        } else {
            return await this.repo.existsBy({ name });
        }
    }

    async save(brand: Brand): Promise<Brand> {
        // Validates uniqueness before saving a new brand
        const exists = await this.existsByName(brand.getName());
        if (exists) throw new BussinessError("Can not duplicate a brand name.");

        // Persists the brand and returns a domain entity
        const saved = await this.repo.save({ id: brand._id, name: brand.getName() });
        return new Brand(saved.id, saved.name);
    }

    async findAll(): Promise<Brand[]> {
        // Retrieves all brands and maps them to domain entities
        const entities = await this.repo.find();
        return entities.map(e => new Brand(e.id, e.name));
    }

    async findById(id: string): Promise<Brand> {
        // Retrieves a brand by ID or throws if not found
        const entity = await this.repo.findOneBy({ id });
        if (!entity) throw new NotFoundException(`Brand with id: ${id} not found`);
        return new Brand(entity.id, entity.name);
    }

    async update(brand: Brand): Promise<Brand> {
        // Validates uniqueness before updating
        const exists = await this.existsByName(brand.getName(), brand._id);
        if (exists) throw new BussinessError("Can not duplicate a brand name.");

        // Ensures the brand exists before updating
        const entityExists = await this.repo.findOneBy({ id: brand._id });
        if (!entityExists) throw new NotFoundException("The brand to be updated does not exist.");

        // Applies the update and returns the updated domain entity
        entityExists.name = brand.getName();
        const updatedBrand = await this.repo.save(entityExists);
        return new Brand(updatedBrand.id, updatedBrand.name);
    }

    async delete(id: string): Promise<void> {
        // Ensures the brand exists before attempting deletion
        const entity = await this.repo.findOneBy({ id });
        if (!entity) throw new NotFoundException("Brand not found");

        // Deletes the brand from the database
        await this.repo.delete(id);
    }
}
