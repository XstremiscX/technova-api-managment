import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "../../domain/entities/brand.entity";
import { Brand } from "../../domain/entities/brand";
import { Repository } from "typeorm";
import { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";

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

    // This method create a brand in the database.
    async save(brand: Brand): Promise<BrandResponseDto> {

        const exists = await this.existsByName(brand.getName());
        if (exists) throw new BussinessError("Can not duplicate a brand name.");

        const saved = await this.repo.save({ id : brand._id, name : brand.getName()});

        return {id: saved.id, name: saved.name};

    }

    // This method gets all brands in the database.
    async findAll(): Promise<BrandResponseDto[]> {
        
        const entities = await this.repo.find();

        return entities.map(e=> new Brand(e.id,e.name));
        
    }   

    // This method gets a brand by ID.
    async findById(id: string): Promise<BrandResponseDto> {

        const entity = await this.repo.findOneBy({id});

        if(!entity) throw new NotFoundException(`Brand with id: ${id} not found`);

        return {id: entity.id, name: entity.name};

    }

    // This method updates a brand in the database.
    async update(brand: Brand): Promise<BrandResponseDto> {

        const exists = await this.existsByName(brand.getName(),brand._id);

        if(exists) throw new BussinessError("Can not duplicate a brand name.");

        // Ensures the brand exists before updating
        const entityExists = await this.repo.findOneBy({ id: brand._id });
        if (!entityExists) throw new NotFoundException("The brand to be updated does not exist.");

        if(!entityExists) throw new NotFoundException("The brand to be updated does not exist.");

        entityExists.name = brand.getName();
        const updatedBrand = await this.repo.save(entityExists);

        return {id: updatedBrand.id, name: updatedBrand.name};

    }

    async delete(id: string): Promise<void> {
        // Ensures the brand exists before attempting deletion
        const entity = await this.repo.findOneBy({ id });
        if (!entity) throw new NotFoundException("Brand not found");

        // Deletes the brand from the database
        await this.repo.delete(id);
    }
}
