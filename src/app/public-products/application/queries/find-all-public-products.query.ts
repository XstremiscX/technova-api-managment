import { FiltersDto } from "../../presentation/dto/filters.dto";

export class FindAllPublicProductsQuery{
    
    constructor(
        public readonly filtersDto: FiltersDto
    ){}

}