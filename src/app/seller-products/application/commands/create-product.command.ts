export class CreateProductCommand{
    constructor(
        public readonly name:string,
        public readonly image:string,
        public readonly description:string,
        public readonly price:number,
        public readonly stock:number,
        public readonly details:string,
        public readonly brand:string,
        public readonly category:string,
        public readonly seller_id:string
    ){}
}