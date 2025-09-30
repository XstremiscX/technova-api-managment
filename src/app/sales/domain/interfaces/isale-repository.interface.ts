import { Sale } from "../entities/sale";

export interface ISaleRepository{
    
    findAllSales(userId:string,userType:string):Promise<Sale[] | []>;

    findSaleDetail(saleId:string):Promise<Sale>;

    saveSale(sale:Sale):Promise<Sale>;

}