import { Category } from "../../domain/entities/category";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { Injectable } from "@nestjs/common";
import { ICategoryRepository } from "../../domain/interfaces/icategory-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import { NotFoundException } from "@nestjs/common";
import { CategoryResponseDto } from "../../presentations/dtos/response-category.dto";
import { CategoryMapper } from "../../presentations/mappers/category.mapper";

// Repository implementation for Category, handling persistence and domain mapping
@Injectable()
export class CategoryRepository implements ICategoryRepository {

    // Injects the TypeORM repository for CategoryEntity and the domain mapper
    constructor(
        @InjectRepository(CategoryEntity) private repo: Repository<CategoryEntity>,
        private mapper: CategoryMapper
    ) {}

    async existsByName(name: string, excludedId?: string): Promise<boolean> {
        // Checks whether a category with the given name already exists
        // If excludedId is provided, it excludes that ID from the comparison (used during updates)
        if (excludedId) {
            const duplicated = await this.repo.findOne({ where: { name } });
            return !!(duplicated && duplicated.id !== excludedId);
        } else {
            return await this.repo.existsBy({ name });
        }
    }

    async save(category: Category): Promise<Category> {
        // Validates uniqueness before saving a new category
        const exists = await this.existsByName(category.getName());

        if (exists) throw new BussinessError("Can not duplicate a Category name.");

        // Persists the category and returns a domain entity
        const categoryToEntity = this.mapper.toEntityFromDomain(category);

        const saved = await this.repo.save(categoryToEntity);

        return this.mapper.toDomainFromEntity(saved);
    }

    async findAll(): Promise<Category[]> {
        // Retrieves all categories and maps them to response DTOs
        const entities = await this.repo.find();
        return entities.map(e => this.mapper.toDomainFromEntity(e));
    }

    async findById(id: string): Promise<Category> {
        // Retrieves a category by ID or throws if not found
        const entity = await this.repo.findOneBy({ id });

        if (!entity) throw new NotFoundException(`Category with id: ${id} not found`);

        return this.mapper.toDomainFromEntity(entity);
    }

    async update(category: Category): Promise<Category> {
        // Ensures the category exists before updating
        const entityExists = await this.repo.findOneBy({ id: category.id });

        if (!entityExists) throw new NotFoundException(`Category with id: ${category.id} not found`);

        // Validates uniqueness before updating
        const existsSameName = await this.existsByName(category.getName(), category.id);

        if (existsSameName) throw new BussinessError("Can not duplicate a Category name.");

        // Applies the update and returns the updated domain entity
        entityExists.name = category.getName();
        entityExists.description = category.getDescription();
        const updatedCategory = await this.repo.save(entityExists);
        return this.mapper.toDomainFromEntity(updatedCategory);
    }

    async delete(id: string): Promise<void> {
        // Ensures the category exists before attempting deletion
        const entity = await this.repo.findOneBy({ id });
        if (!entity) throw new NotFoundException(`Category with id: ${id} not found`);

        // Deletes the category from the database
        await this.repo.delete(id);
    }
}
