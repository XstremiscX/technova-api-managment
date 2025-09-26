import { FiltersDto } from "../../presentation/dto/filters.dto";

export interface IPublicProductsRepository<TDomain> {

    findAll(filterObject: FiltersDto):Promise<TDomain[] | []>;

    findById(id:string):Promise<TDomain>;

}