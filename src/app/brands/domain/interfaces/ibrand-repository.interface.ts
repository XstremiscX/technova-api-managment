import { Brand } from "../entities/brand";
import { IBaseRepository } from "src/app/commons/interfaces/ibase-repository";

// Specific interface of the brand repository.
export interface IBrandRepository extends IBaseRepository<Brand>{

    // Check if there is a brand with a specific name.
    existsByName(name:string) : Promise<boolean>;
    
}
