import { UserTypeEnum } from "src/app/commons/utils/enums/users-type.enum";
import { v4 as uuid } from 'uuid';
import { User } from "../../domain/entities/user";
import { BadRequestException } from "@nestjs/common";

/**
 * Builder class for constructing a User domain entity.
 * Encapsulates required fields and provides a fluent API for optional configuration.
 */
export class UserBuilder{
    id:string;
    name:string;
    email:string;
    phone:string;
    address:string;
    type:UserTypeEnum;
    password:string;
    status:boolean;
    verified:boolean;
    registration_date:Date;

     /**
     * Initializes the builder with required user fields.
     * Automatically assigns a UUID and default status values.
     */
    constructor(
        name:string,
        email:string,
        phone:string,
        address:string,
    ){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.id = uuid();
        this.status = true;
        this.verified = false;
        this.registration_date = new Date();
    }
    
    // Sets the user type
    withType(type:UserTypeEnum):UserBuilder{
        this.type = type;
        return this;
    }

    // Sets the hashed password
    withPassword(hashedPassword:string):UserBuilder{
        this.password = hashedPassword;

        return this;
    }

    // Builds and returns the User domain entity
    build():User{
        if(this.password === undefined) throw new BadRequestException("Password is required to create a user.");
        if(!this.name || !this.email || !this.phone || !this.address) throw new BadRequestException("Name, email, phone and address are required to create a user.");
        if(!this.type) throw new BadRequestException("User type is required to create a ")

        return new User(this);
    }
}