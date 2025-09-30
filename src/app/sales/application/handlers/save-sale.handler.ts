import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { SaveSaleCommand } from "../commands/save-sale.command";
import { Inject } from "@nestjs/common";
import type { ISaleRepository } from "../../domain/interfaces/isale-repository.interface";
import { SaleMapper } from "../../presentations/mappers/sale.mapper";
import { SaleItemResponseDto } from "../../presentations/dtos/response-sale-item.dto";
import { Sale } from "../../domain/entities/sale";
import { v4 as uuid } from 'uuid';

@CommandHandler(SaveSaleCommand)
export class SaveSaleHandler implements ICommandHandler<SaveSaleCommand>{

    constructor(
        @Inject("ISaleRepository") private readonly saleRepository:ISaleRepository,
        private readonly saleMapper : SaleMapper
    ){}

    async execute(command: SaveSaleCommand): Promise<SaleItemResponseDto> {

        const sale = new Sale(
            uuid(),
            command.amount,
            command.quantity,
            command.buyerId,
            command.sellerId,
            command.details,
            new Date()
        )

        const saved = await this.saleRepository.saveSale(sale);

        return this.saleMapper.toResponseDtoFromDomain(saved);

    }

}