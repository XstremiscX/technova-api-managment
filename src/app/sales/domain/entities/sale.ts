export class Sale{

    constructor(
        public readonly id:string,
        private amount:number,
        private quantity:number,
        private buyer:string,
        private seller:string,
        private details:string,
        private date:Date
    ){}

    getAmount():number{
        return this.amount;
    }

    getQuantity():number{
        return this.quantity;
    }

    getBuyer():string{
        return this.buyer;
    }

    getSeller():string{
        return this.seller;
    }

    getDetails():string{
        return this.details;
    }

    getDate():Date{
        return this.date;
    }
}