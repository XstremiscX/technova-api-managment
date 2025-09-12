import { IBaseRepository } from "src/app/commons/interfaces/ibase-repository";
import { Category } from "../entities/category";
import { CategoryResponseDto } from "../../presentations/dtos/response-category.dto";

// Interface for the Category repository, extending the base repository with domain-specific operations
export interface ICategoryRepository extends IBaseRepository<Category> {

    // Checks if a category with the given name already exists in the database
    existsByName(name: string): Promise<boolean>;
}
