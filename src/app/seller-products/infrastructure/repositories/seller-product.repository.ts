import { Not, Repository } from "typeorm";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ISellerProductRepository } from "../../domain/interfaces/iseller-product-repository.interface";
import { ProductEntity } from "../../domain/entities/product.entity";
import { SellerProduct } from "../../domain/entities/seller-product";
import { SellerProductMapper } from "../../presentations/mappers/seller-products.mapper";
import { UserEntity } from "src/app/users/domain/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "src/app/brands/domain/entities/brand.entity";


@Injectable()
export class SellerProductRepository implements ISellerProductRepository<SellerProduct>{

    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository:Repository<ProductEntity>,
        private readonly mapper:SellerProductMapper
    ){}

    async findAll(seller_id:string): Promise<SellerProduct[]> {

        const seller = new UserEntity();
        
        seller.id = seller_id;

        const productsArray = await this.productRepository.find({where:{status:Not(2),seller_id:seller},loadRelationIds:true}); 

        return productsArray.map((product)=>{return this.mapper.fromEntityToDomain(product)});

    }

    // async findByFilters(sellerId?: string, category?: string, brand?: string, minPrice?: number, maxPrice?: number, name?: string): Promise<Product[] | undefined> {

    //     let filtersPayload: any = {};

    //     if(sellerId) filtersPayload.sellerId = sellerId;
    //     if(category) filtersPayload.category = category;
    //     if(brand) filtersPayload.brand = brand;
    //     if(name) filtersPayload.name = Like(`%${name}%`);
    //     if(minPrice && maxPrice){
    //         filtersPayload.price = Between(minPrice,maxPrice);
    //     }else if(minPrice){
    //         filtersPayload.price = MoreThanOrEqual(minPrice);
    //     }else if(maxPrice){
    //         filtersPayload.price = LessThanOrEqual(maxPrice);
    //     }
    //     filtersPayload.status = 1;

    //     const productsArray = await this.productRepository.find({where:filtersPayload})

    //     if(productsArray.length <= 0) return [];

    //     return productsArray.map((product)=>{return this.mapper.fromEntityToDomain(product)});

    // }

    async findById(id: string): Promise<SellerProduct> {
        const product = await this.productRepository.findOne({where:{id, status:1},loadRelationIds:true})

        if(!product) throw new NotFoundException("Product not found.");

        return this.mapper.fromEntityToDomain(product);
    }

    async save(product: SellerProduct): Promise<SellerProduct> {

        const productEntity = this.mapper.fromDomainToEntity(product);

        const savedProduct = await this.productRepository.save(productEntity);

        if(!savedProduct) throw new InternalServerErrorException("Something went wrong during product creation.");

        return this.mapper.fromEntityToDomain(savedProduct);

    }

    async update(product: SellerProduct): Promise<SellerProduct> {

        const exists = await this.productRepository.exists({where:{id:product.id,status:Not(2)}})

        if(!exists) throw new NotFoundException("Product to be update does not exist.")
        
        const productEntity = this.mapper.fromDomainToEntity(product);

        const updatedProduct = await this.productRepository.save(productEntity)

        if(!updatedProduct) throw new InternalServerErrorException("Something went wrong during product update.")

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