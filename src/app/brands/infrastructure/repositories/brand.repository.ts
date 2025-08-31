import { Injectable, NotFoundException } from "@nestjs/common";
import { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "../../domain/entities/brand.entity";
import { Brand } from "../../domain/entities/brand";
import { Repository } from "typeorm";

@Injectable()
export class BrandRepository{


    constructor(@InjectRepository(BrandEntity) private repo: Repository<BrandEntity>){};

    // This method create a brand in the database.
    async createBrand(brand: Brand): Promise<void> {

        await this.repo.save(brand);
    }

    // This method gets all brands in the database.
    async listAllBrands(): Promise<Brand[] | null> {
        
        const entityList = await this.repo.find();

        return entityList;
        
    }   

    // This method gets a brand by ID.
    async getBrandById(id: string): Promise<Brand> {

        const entity = await this.repo.findOneBy({id});

        if(entity){

            return entity

        }else{

            throw new NotFoundException("Brand not found")

        }

    }

    // This method updates a brand in the database.
    async updateBrand(brand: Brand): Promise<Brand> {

        const entityExists = await this.repo.findOneBy({id: brand.id});

        if(entityExists){

            entityExists.name = brand.name;

            const updatedBrand = await this.repo.save(entityExists);

            return updatedBrand;

        }else{ 

            throw new NotFoundException("The brand to be updated does not exist.");
            
        }
        
    }

    // This method deletes a brand from de database.
    async deleteBrand(id: string): Promise<void> {

        const entity = await this.repo.findOneBy({id})
        
        if(entity){

            this.repo.remove(entity);

        }else{

            throw new NotFoundException("Brand not found");

        }

        

    }

}