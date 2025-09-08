import { UserTypeEnum } from "src/app/commons/utils/enums/users-type.enum";
import { v4 as uuid } from 'uuid';
import { User } from "../../domain/entities/user";
import { BadRequestException } from "@nestjs/common";

export class UserBuilder{
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
        name:string,
        email:string,
        phone:string,
    ){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.id = uuid();
        this.type = UserTypeEnum.BUYER;
        this.status = true;
        this.verified = false;
        this.registration_date = new Date();
    }

    withId(id:string):UserBuilder{
        if(!id) throw new BadRequestException("Id is required.");
        this.id = id;
        return this;
    }

    withStatus(status:boolean):UserBuilder{
        this.status = status;
        return this;
    }

    withVerified(verified:boolean):UserBuilder{
        this.verified = verified;
        return this;
    }

    withAddress(address:string):UserBuilder{
        this.address = address;
        return this;
    }

    withType(type:UserTypeEnum):UserBuilder{
        this.type = type;
        return this;
    }

    withPassword(hashedPassword:string):UserBuilder{
        this.password = hashedPassword;

        return this;
    }

    build():User{
        if(this.password === undefined) throw new BadRequestException("Password is required to create a user.");

        return new User(this);
    }
}