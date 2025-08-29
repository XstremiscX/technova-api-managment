import { Brand } from "../entities/brand";
import { BrandEntity } from "../entities/brand.entity";

export interface IBrandRepository{

    // This method will allow you to add a new brand to the database and return the newly created brand.
    createBrand(brand: Brand):Promise<void>;

    // This method will list all the brands available in the database.
    listAllBrands(): Promise<Brand[] | null>;
    
    // This method allows you to obtain data for a brand by searching for its ID.
    getBrandById(id:string):Promise<Brand | null>;

    // This method updates a brand and returns an object with the updated data.
    updateBrand(brand:Brand):Promise<Brand>;

    // This method allows you to remove a brand.
    deleteBrand(id:string):Promise<void>;
    
}