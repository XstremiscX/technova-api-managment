import { Injectable, NotFoundException } from "@nestjs/common";
import { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "../../domain/entities/brand.entity";
import { Brand } from "../../domain/entities/brand";
import { BrandMapper } from "../../application/mappers/brand.mapper";
import { Repository } from "typeorm";

@Injectable()
export class BrandRepository implements IBrandRepository{


    constructor(@InjectRepository(BrandEntity) private repo: Repository<BrandEntity>, 
    private readonly mapper: BrandMapper){};

   

    async createBrand(brand: Brand): Promise<void> {

        const entity = this.mapper.toEntity(brand);

        await this.repo.save(entity);
    }

    async listAllBrands(): Promise<Brand[] | null> {
        
        const entityList = await this.repo.find();

        return this.mapper.toDomainList(entityList);
        
    }   

    async getBrandById(id: string): Promise<Brand | null> {

        const entity = await this.repo.findOneBy({id});

        return entity ? this.mapper.toDomain(entity) : null;

    }

    async updateBrand(brand: Brand): Promise<Brand> {

        const entityExists = await this.repo.findOneBy({id: brand.id});

        if(!entityExists) throw new NotFoundException("The brand to be updated does not exist.");

        entityExists.name = brand.name;

        const updatedBrand = await this.repo.save(entityExists);

        return this.mapper.toDomain(updatedBrand);
        
    }

    async deleteBrand(id: string): Promise<void> {

        const entity = await this.repo.findOneBy({id})
        
        if(entity){

            this.repo.remove(entity);

        }else{

            throw new NotFoundException("Brand not found");

        }

        

    }

}