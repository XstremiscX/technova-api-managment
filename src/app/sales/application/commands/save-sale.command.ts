export class SaveSaleCommand{

    constructor(
        public readonly amount:number,
        public readonly quantity:number,
        public readonly buyerId:string,
        public readonly sellerId:string,
        public readonly details:string
    ){}

}