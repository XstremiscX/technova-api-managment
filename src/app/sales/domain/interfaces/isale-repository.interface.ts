import { Sale } from "../entities/sale";

export interface ISaleRepository{
    
    findAllSales(userId:string):Promise<Sale[]>;

    findSaleDetail(userId:string, saleId:string):Promise<Sale>;

}