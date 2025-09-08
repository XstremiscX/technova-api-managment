import { BrandResponseDto } from "../../presentations/dtos/response-brand.dto";
import { Brand } from "../entities/brand";
import { IBaseRepository } from "src/app/commons/interfaces/ibase-repository";

export interface IBrandRepository extends IBaseRepository<Brand,BrandResponseDto>{

    existsByName(name:string) : Promise<boolean>;

    findAll():Promise<BrandResponseDto[]>;
    
}