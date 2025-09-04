import { Brand } from "../entities/brand";
import { IBaseRepository } from "src/app/commons/interfaces/ibase-repository";

// Interface for the Brand repository, extending the generic base repository
export interface IBrandRepository extends IBaseRepository<Brand> {

    // Checks whether a brand with the given name already exists in the database
    existsByName(name: string): Promise<boolean>;
}
