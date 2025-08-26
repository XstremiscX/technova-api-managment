export interface IProductEntity {
    id:string;
    name:string;
    image:string;
    description:string;
    category:string;
    brand:string;
    price:number;
    stock:number;
    details:string;
    status:number; // 0: inactive, 1: active, 2: deleted
    createdAt: Date;
    seller_id:string;
}
