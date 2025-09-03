import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "../../domain/entities/brand.entity";
import { Brand } from "../../domain/entities/brand";
import { Repository } from "typeorm";
import { IBrandRepository } from "../../domain/interfaces/ibrand-repository.interface";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";

@Injectable()
export class BrandRepository implements IBrandRepository{


    constructor(@InjectRepository(BrandEntity) private repo: Repository<BrandEntity>){};

    //
    async existsByName(name: string, excludedId?:string): Promise<boolean> {

        if(excludedId){

            const duplicated = await this.repo.findOne({where:{name}});

            return !!(duplicated && duplicated.id != excludedId);

        }else{

            const exists = await this.repo.existsBy({name});

            return exists;

        }

    }

    // This method create a brand in the database.
    async save(brand: Brand): Promise<Brand> {

        const exists = await this.existsByName(brand.getName());

        if(exists) throw new BussinessError("Can not duplicate a brand name.");

        const saved = await this.repo.save({ id : brand._id, name : brand.getName()});

        return new Brand(saved.id,saved.name);

    }

    // This method gets all brands in the database.
    async findAll(): Promise<Brand[]> {
        
        const entities = await this.repo.find();

        return entities.map(e=> new Brand(e.id,e.name));
        
    }   

    // This method gets a brand by ID.
    async findById(id: string): Promise<Brand> {

        const entity = await this.repo.findOneBy({id});

        if(!entity) throw new NotFoundException(`Brand with id: ${id} not found`);

        return new Brand(entity.id, entity.name)

    }

    // This method updates a brand in the database.
    async update(brand: Brand): Promise<Brand> {

        const exists = await this.existsByName(brand.getName(),brand._id);

        if(exists) throw new BussinessError("Can not duplicate a brand name.");

        const entityExists = await this.repo.findOneBy({id: brand._id});

        if(!entityExists) throw new NotFoundException("The brand to be updated does not exist.");

        entityExists.name = brand.getName();

        const updatedBrand = await this.repo.save(entityExists);

        return new Brand( updatedBrand.id, updatedBrand.name);
            
        
    }

    // This method deletes a brand from de database.
    async delete(id: string): Promise<void> {

        const entity = await this.repo.findOneBy({id})
        
        if(!entity) throw new NotFoundException("Brand not found");

        this.repo.delete(id);

    }

}