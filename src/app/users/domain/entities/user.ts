import { BadRequestException } from "@nestjs/common";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import { UserTypeEnum } from "src/app/commons/utils/enums/users-type.enum";
import { UserBuilder } from "../../infrastructure/builders/user.builder";
import { PasswordService } from "../../infrastructure/services/password.service";
import { Inject } from "@nestjs/common";

export class User{
    id:string;
    name:string;
    email:string;
    phone:string;
    address?:string;
    type:UserTypeEnum;
    password:string;
    status:boolean;
    verified:boolean;
    registration_date:Date;

    constructor(
        userBuilder: UserBuilder,
    ){
        this.id = userBuilder.id;
        this.name = userBuilder.name;
        this.email = userBuilder.email;
        this.phone = userBuilder.phone;
        this.address = userBuilder.address;
        this.type = userBuilder.type;
        this.password = userBuilder.password;
        this.status = userBuilder.status;
        this.verified = userBuilder.verified;
        this.registration_date = userBuilder.registration_date;
    }

    private validateDifference(currentData:string, newData: string, fieldName:string):string{
        // Throws a businesserror if the current currentData is the same as the newData.
        if(newData === currentData) throw new BussinessError(`The current ${fieldName} and the new ${fieldName} must be different.`);

        return newData;
    }

    // Returns the user name.
    getName():string{
        return this.name;
    }

    // Returns the user email.
    getEmail():string{
        return this.email;
    }

    // Returns the user name.
    getPhoneNumber():string{
        return this.phone;
    }

    // Returns the user address.
    getAddress():string | undefined{
        return this.address;
    }

    // Returns the user type.
    getType():UserTypeEnum{
        return this.type;
    }

    // Returns the user status.
    getStatus():boolean{
        return this.status;
    }

    // Returns the user verified.
    getVerified():boolean{
        return this.verified;
    }
    
}