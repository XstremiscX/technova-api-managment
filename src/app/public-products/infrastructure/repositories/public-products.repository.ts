import { Product } from "src/app/commons/domain/entitites/product";
import { IPublicProductsRepository } from "../../domain/interfaces/ipublic-products-repository.interface";
import { FiltersDto } from "../../presentation/dto/filters.dto";
import { Like, MoreThanOrEqual, LessThanOrEqual, Between, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/app/commons/domain/entitites/product.entity";
import { ProductMapper } from "@mappers/products.mapper";
import { NotFoundException } from "@nestjs/common";

export class PublicProductsRepository implements IPublicProductsRepository<Product>{

    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
        private readonly mapper: ProductMapper
    ){}

    async findAll(filterObject: FiltersDto): Promise<Product[] | []> {
        
        let filtersPayload: any = {};

        if(filterObject.sellerId) filtersPayload.sellerId = filterObject.sellerId;
        if(filterObject.categoryId) filtersPayload.category = filterObject.categoryId;
        if(filterObject.brandId) filtersPayload.brand = filterObject.brandId;
        if(filterObject.name) filtersPayload.name = Like(`%${filterObject.name}%`);
        if(filterObject.minPrice && filterObject.maxPrice){
            filtersPayload.price = Between(filterObject.minPrice,filterObject.maxPrice);
        }else if(filterObject.minPrice){
            filtersPayload.price = MoreThanOrEqual(filterObject.minPrice);
        }else if(filterObject.maxPrice){
            filtersPayload.price = LessThanOrEqual(filterObject.maxPrice);
        }
        filtersPayload.status = 1;

        const productsArray = await this.productRepository.find({where:filtersPayload,loadRelationIds:true});

        if(productsArray.length <= 0) return [];

        return productsArray.map((product)=>{return this.mapper.fromEntityToDomain(product)});

    }

    async findById(id: string): Promise<Product> {

        const productEntity = await this.productRepository.findOne({where:{id:id,status:1},loadRelationIds:true})

        if(!productEntity) throw new NotFoundException("Product not found.");

        return this.mapper.fromEntityToDomain(productEntity);

    }

}

