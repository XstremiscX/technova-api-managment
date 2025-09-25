import { Request } from "@nestjs/common";

export class FindAllProductsQuery{
    constructor(
        public readonly seller_id:string
    ){}
}