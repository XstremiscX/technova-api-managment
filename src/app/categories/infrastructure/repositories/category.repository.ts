import { Category } from "../../domain/entities/category";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { Injectable } from "@nestjs/common";
import { ICategoryRepository } from "../../domain/interfaces/icategory-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class CategoryRepository implements ICategoryRepository {

    // Injects the TypeORM repository for the CategoryEntity
    constructor(@InjectRepository(CategoryEntity) private repo: Repository<CategoryEntity>) {}

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
        const saved = await this.repo.save({
            id: category._id,
            name: category.getName(),
            description: category.getDescription()
        });

        return new Category(saved.id, saved.name, saved.description);
    }

    async findAll(): Promise<Category[]> {
        // Retrieves all categories and maps them to domain entities
        const entities = await this.repo.find();
        return entities.map(e => new Category(e.id, e.name, e.description));
    }

    async findById(id: string): Promise<Category> {
        // Retrieves a category by ID or throws if not found
        const entity = await this.repo.findOneBy({ id });
        if (!entity) throw new NotFoundException(`Category with id: ${id} not found`);
        return new Category(entity.id, entity.name, entity.description);
    }

    async update(category: Category): Promise<Category> {
        // Validates uniqueness before updating
        const exists = await this.existsByName(category.getName(), category._id);
        if (exists) throw new BussinessError("Can not duplicate a Category name.");

        // Ensures the category exists before updating
        const entityExists = await this.repo.findOneBy({ id: category._id });
        if (!entityExists) throw new NotFoundException("The Category to be updated does not exist.");

        // Applies the update and returns the updated domain entity
        entityExists.name = category.getName();
        const updatedCategory = await this.repo.save(entityExists);
        return new Category(updatedCategory.id, updatedCategory.name, updatedCategory.description);
    }

    async delete(id: string): Promise<void> {
        // Ensures the category exists before attempting deletion
        const entity = await this.repo.findOneBy({ id });
        if (!entity) throw new NotFoundException("Category not found");

        // Deletes the category from the database
        await this.repo.delete(id);
    }
}
