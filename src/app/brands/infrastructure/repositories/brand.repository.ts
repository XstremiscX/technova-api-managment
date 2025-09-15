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

        //Prevents duplicate names before making the change.
        const exists = await this.existsByName(brand.getName());

        if (exists) throw new BussinessError("Can not duplicate a brand name.");

        const saved = await this.repo.save({ id : brand.id, name : brand.getName()});

        return this.mapper.toDomainFromEntity(saved);

    }


    async findAll(): Promise<Brand[]> {
        
        //Recovers all brands and transforms them into domain entities
        const entities = await this.repo.find();

        return entities.map(e => this.mapper.toDomainFromEntity(e));

    }


    async findById(id: string): Promise<Brand> {

        // Searches for a brand and returns it if it exists, otherwise throws an error.
        const entity = await this.repo.findOneBy({id});

        if(!entity) throw new NotFoundException(`Brand with id: ${id} not found`);

        return this.mapper.toDomainFromEntity(entity);

    }


    async update(brand: Brand): Promise<Brand> {

        // Validate that there is no name identical to the new name.
        const exists = await this.existsByName(brand.getName(),brand.id);

        if(exists) throw new BussinessError("Can not duplicate a brand name.");

        // Validate that a brand with that ID exists.
        const entityExists = await this.repo.findOneBy({ id: brand.id });

        if (!entityExists) throw new NotFoundException("The brand to be updated does not exist.");


        entityExists.name = brand.getName();

        const updatedBrand = await this.repo.save(entityExists);

        return this.mapper.toDomainFromEntity(updatedBrand);

    }

    async delete(id: string): Promise<void> {
        // Check that the mark exists before removing it.
        const entity = await this.repo.findOneBy({ id });
        if (!entity) throw new NotFoundException("Brand not found");
        await this.repo.delete(id);
    }
}
