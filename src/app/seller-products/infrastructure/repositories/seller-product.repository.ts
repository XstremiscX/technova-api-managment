import { Not, Repository } from "typeorm";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ISellerProductRepository } from "../../domain/interfaces/iseller-product-repository.interface";
import { ProductEntity } from "../../../commons/domain/entitites/product.entity";
import { Product } from "../../../commons/domain/entitites/product";
import { ProductMapper } from "../../../commons/mappers/products.mapper";
import { UserEntity } from "src/app/users/domain/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";


@Injectable()
export class SellerProductRepository implements ISellerProductRepository<Product>{

    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository:Repository<ProductEntity>,
        private readonly mapper:ProductMapper
    ){}

    async existsByName(name:string, seller:UserEntity, productIdExlude?:string):Promise<boolean>{

        if(productIdExlude){

            const exists = await this.productRepository.exists({where:{name:name,seller_id:seller,id:Not(productIdExlude)}});

            return exists;

        }else{

            const exists = await this.productRepository.exists({where:{name:name,seller_id:seller}})

            return exists;
        }

    }

    private async validateUniqueName(name: string, seller: UserEntity, excludeId?: string): Promise<void> {
        const exists = await this.existsByName(name, seller, excludeId);
        if (exists) throw new BussinessError(`The name ${name} is duplicated.`);
    }


    async findAll(seller_id:string): Promise<Product[]> {

        const seller = new UserEntity();
        
        seller.id = seller_id;

        const productsArray = await this.productRepository.find({where:{status:Not(2),seller_id:seller},loadRelationIds:true}); 

        return productsArray.map((product)=>{return this.mapper.fromEntityToDomain(product)});

    }

    async findById(id: string): Promise<Product> {
        const product = await this.productRepository.findOne({where:{id, status:Not(2)},loadRelationIds:true})

        if(!product) throw new NotFoundException("Product not found.");

        return this.mapper.fromEntityToDomain(product);
    }

    async save(product: Product): Promise<Product> {

        const productEntity = this.mapper.fromDomainToEntity(product);

        await this.validateUniqueName(productEntity.name,productEntity.seller_id);

        const savedProduct = await this.productRepository.save(productEntity);

        if(!savedProduct) throw new InternalServerErrorException("Something went wrong during product creation.");

        return this.mapper.fromEntityToDomain(savedProduct);

    }

    async update(product: Product): Promise<Product> {

        const productExists = await this.productRepository.exists({where:{id:product.id,status:Not(2)}})

        if(!productExists) throw new NotFoundException("Product to be update does not exist.")
        
        const productEntity = this.mapper.fromDomainToEntity(product);

        await this.validateUniqueName(productEntity.name,productEntity.seller_id,productEntity.id);

        const updatedProduct = await this.productRepository.save(productEntity);

        if(!updatedProduct) throw new InternalServerErrorException("Something went wrong during product update.");

        return this.mapper.fromEntityToDomain(updatedProduct);

    }

    async softDelete(productId:string, sellerId:string ): Promise<void> {

        const seller = new UserEntity();

        seller.id = sellerId;

        const exists = await this.productRepository.exists({where:{id:productId,status:Not(2),seller_id:seller}});

        if(!exists) throw new NotFoundException("Product for delete not found.")

        const updatedProduct = await this.productRepository.update({id:productId},{status:2});

        const rowAfecteds = updatedProduct.affected;

        if(!(typeof rowAfecteds === "number") || rowAfecteds <= 0) throw new InternalServerErrorException("Something went wrong during product removal.")

    }

}