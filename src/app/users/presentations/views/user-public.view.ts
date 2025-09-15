import { BadRequestException } from "@nestjs/common";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import { UserResponseDto } from "../dtos/response-user.dto";

/**
 * Represents a public-facing view of a user, used for safe updates and DTO transformation.
 * Encapsulates mutable fields and enforces validation before applying changes.
 */

export class UserPublicView{
    constructor(
        public readonly id:string,
        private name: string,
        private phone: string,
        private email: string,
        private address: string
    ){}

    /** Returns the user's name */
    getName():string{
        return this.name;
    }

    /** Returns the user's phone number */
    getPhoneNumber():string{
        return this.phone;
    }

    /** Returns the user's email */
    getEmail():string{
        return this.email;
    }

    /** Returns the user's address */
    getAddress():string{
        return this.address;
    }

    /**
    * Validates that a field is not null or unchanged (if required).
    * Throws a business error if the new value matches the current one.
    */
    private validateField(fieldData:string, fieldName:string, validateEquals?:boolean):void{
        if(!fieldData || fieldData.trim() === undefined){
            throw new BadRequestException(`The ${fieldName} must be different from null or undefined`);
        }

        if(validateEquals){
            switch(fieldName){
                case "phone": 
                    if(this.phone === fieldData) throw new BussinessError("The new phone number must be different from the current phone number");
                    break;
                case "email": 
                    if(this.email === fieldData) throw new BussinessError("The new email must be different from the current email");
                    break;
                case "address": 
                    if(this.address === fieldData) throw new BussinessError("The new address must be different from the current address");
                    break;
            }
        }
    }

    /**
    * Updates the user's name after validation.
    */
    changeName(newName: string):void{
        
        this.validateField(newName,"name");

        this.name = newName

    }
    
    /**
    * Updates the user's phone number after validation.
    */
    changePhoneNumber(newPhone:string):void{

        this.validateField(newPhone,"phone",true);

        this.phone = newPhone;
    }
    
    /**
    * Updates the user's email after validation.
    */
    changeEmail(newEmail:string):void{
        this.validateField(newEmail,"email",true);

        this.email = newEmail;
    }

    /**
    * Updates the user's address after validation.
    */
    changeAddress(newAddress: string):void{
        this.validateField(newAddress,"address",true)
    }

    /**
    * Converts the current view into a response DTO.
    */
    returnDto():UserResponseDto{
        return{
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            address: this.address
        }
    }
}