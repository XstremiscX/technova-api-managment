import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import {v4 as uuid} from 'uuid';

export class Product{
    
    constructor(
        private name:string,
        private image:string,
        private description:string,
        private price:number,
        private stock:number,
        private details:string,
        private brand:string,
        private category:string,
        private seller_id:string,
        private status:number,
        public readonly id:string,
        public readonly createdAt:Date
    ){
        this.setValidStatus(status);
        if(!id) this.id = uuid();
        if(!createdAt) this.createdAt = new Date()
    }

    private setValidStatus(status:number):void{
        if(!([0,1,2].includes(status))) throw new BadRequestException("the product status is invalid.");
        this.status = status;
    }

    getName():string{
        return this.name;
    }

    getImage():string{
        return this.image;
    }

    getDescription():string{
        return this.description;
    }

    getPrice():number{
        return this.price;
    }

    getStock():number{
        return this.stock;
    }

    getDetails():string{
        return this.details;
    }

    getStatus():number{
        return this.status;
    }

    getBrand():string{
        return this.brand;
    }

    getCategory():string{
        return this.category;
    }

    getSeller_id():string{
        return this.seller_id;
    }

    changeName(newName:string):void{
        if(!(this.name !== newName)) throw new BussinessError("The current product name and the new product name, must be different.");
        this.name = newName;
    }

    changeImage(newImage:string):void{
        this.image = newImage;
    }

    changeDescription(newDescription:string):void{
        this.description = newDescription;
    }

    changePrice(newPrice:number):void{
        if(newPrice <= 0) throw new BussinessError("The price of the product must be greater than zero.")
        this.price = newPrice;
    }

    changeStock(newStock: number):void{
        this.stock = newStock
    }

    changeDetails(newDetails:string):void{
        this.details = newDetails;
    }

    changeStatus(newStatus: number):void{
        this.setValidStatus(newStatus);
    }

    changeCategory(newCategory:string):void{
        if(!newCategory || newCategory === this.category) throw new BussinessError("The new category must be different from the current category.")
        this.category = newCategory;
    }

    changeBrand(newBrand:string):void{
        if(!!newBrand || newBrand === this.brand) throw new BussinessError("The new brand must be different from the current brand.")
        this.brand = this.brand;
    }
    
}