import { BaseMapper } from "@mappers/base.mapper";
import { SaleItemResponseDto } from "../dtos/response-sale-item.dto";
import { SaleEntity } from "../../domain/entities/sale.entity";
import { Sale } from "../../domain/entities/sale";
import { UserEntity } from "src/app/users/domain/entities/user.entity";

export class SaleMapper implements BaseMapper<Sale,SaleItemResponseDto,SaleEntity>{

    toDomainFromEntity(saleEntity: SaleEntity): Sale {
        
        return new Sale(
            saleEntity.id,
            saleEntity.amount,
            saleEntity.quantity,
            typeof saleEntity.buyer == "string" ? saleEntity.buyer : saleEntity.buyer.id,
            typeof saleEntity.seller == "string" ? saleEntity.seller : saleEntity.seller.id,
            saleEntity.details,
            saleEntity.date
        )

    }

    toEntityFromDomain(sale: Sale): SaleEntity {

        const saleEntity = new SaleEntity()
        saleEntity.id = sale.id;
        saleEntity.amount = sale.getAmount();
        saleEntity.quantity = sale.getQuantity();
        saleEntity.details = sale.getDetails();
        saleEntity.date = sale.getDate();

        const buyer = new UserEntity()
        buyer.id = sale.getBuyer();
        saleEntity.buyer = buyer;

        const seller = new UserEntity();
        seller.id = sale.getSeller();
        saleEntity.seller = seller;

        return saleEntity;
        
    }

    toResponseDtoFromDomain(sale: Sale): SaleItemResponseDto {
        
        return {
            id:sale.id,
            amount:sale.getAmount(),
            date:sale.getDate(),
            quantity:sale.getQuantity()
        }

    }

}