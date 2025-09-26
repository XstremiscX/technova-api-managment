import { BrandEntity } from "src/app/brands/domain/entities/brand.entity";
import { Product } from "../domain/entitites/product";
import { ProductEntity } from "../domain/entitites/product.entity";
import { CategoryEntity } from "src/app/categories/domain/entities/category.entity";
import { UserEntity } from "src/app/users/domain/entities/user.entity";
import { ProductItemResponseDto } from "../dtos/response-product-itme.dto";

export class ProductMapper{

    fromEntityToDomain(entity: ProductEntity):Product{

        return new Product(   
            entity.name,
            entity.image,
            entity.description,
            entity.price,
            entity.stock,
            entity.details,
            typeof entity.brand == "string"? entity.brand : entity.brand.id,
            typeof entity.category == "string"? entity.category : entity.category.id,
            typeof entity.seller_id == "string"? entity.seller_id : entity.seller_id.id,
            entity.status,
            entity.id,
            entity.createdAt
        )

    }

    fromDomainToEntity(domain:Product):ProductEntity{
        const entity = new ProductEntity();

        entity.id = domain.id;
        entity.name = domain.getName();
        entity.image = domain.getImage();
        entity.description = domain.getDescription();
        entity.price = domain.getPrice();
        entity.stock = domain.getStock();
        entity.details = domain.getDetails();
        entity.createdAt = domain.createdAt;
        entity.status = domain.getStatus();

        const brand = new BrandEntity();
        brand.id = domain.getBrand();
        entity.brand = brand;

        const category = new CategoryEntity();
        category.id = domain.getCategory();
        entity.category = category;

        const seller = new UserEntity();
        seller.id = domain.getSeller_id();
        entity.seller_id = seller;

        return entity;
    }

    fromDomainToResponseDto(product:Product):ProductItemResponseDto{

        return{
            id:product.id,
            name:product.getName(),
            image:product.getImage(),
            price:Number(product.getPrice()),
            stock:product.getStock(),
            brand:product.getBrand(),
            category:product.getCategory()
        }

    }

}