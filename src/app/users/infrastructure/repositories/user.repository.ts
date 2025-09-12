import { Repository } from "typeorm";
import { IUserRepository } from "../../domain/interfaces/iuser-repository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../domain/entities/user";
import { UserMapper } from "../../presentations/mappers/user.mapper";
import { UserPublicView } from "../../presentations/views/user-public.view";

@Injectable()
export class UserRepository implements IUserRepository{

    constructor(
        @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
        private readonly mapper : UserMapper
    ) {}

    /**
    * Checks if an email is already in use.
    * Optionally excludes a specific user ID (used during updates).
    */
    async existsByEmail(email: string, excludeUserId?: string): Promise<boolean> {

        if(!email) throw new BadRequestException("Email is required.");

        if(excludeUserId){
            const duplicated = await this.repo.findOne({ where: { email } });
            return !!(duplicated && duplicated.id !== excludeUserId);
        }else{
            return await this.repo.existsBy({ email });
        }

    }

    /**
    * Retrieves a user by ID and maps it to a public view.
    * Throws if the user is not found or inactive.
    */
    async findById(id: string):Promise<UserPublicView>{
        
        if(!id) throw new BadRequestException("Id is required.");

        const entity = await this.repo.findOne({where:{id,status:true}, select:['id','name','email','phone','address']});

        if(!entity) throw new NotFoundException("User not found.");

        return this.mapper.toUserPublicViewFromEntity(entity);

    }

    /**
    * Saves a new user to the database.
    * Validates email uniqueness and returns the public view of the saved user.
    */
    async save(user: User): Promise<UserPublicView> {

        const exists = await this.existsByEmail(user.getEmail());

        if(exists) throw new BadRequestException(`Email ${user.getEmail()} is already in use.`);

        await this.repo.save(user);

        const savedUser = await this.repo.findOneBy({id:user.id});

        if(!savedUser) throw new NotFoundException("User not found after save.");

        return this.mapper.toUserPublicViewFromEntity(savedUser);
        
    }

    /**
    * Updates an existing user's public data.
    * Validates email uniqueness and existence before applying changes.
    */
    async update(user: UserPublicView): Promise<UserPublicView>{

        if(!user.id) throw new BadRequestException("Id is required.");

        if( await this.existsByEmail(user.getEmail(), user.id)) throw new BadRequestException(`Email ${user.getEmail()} is already in use.`);

        const entityExists = await this.repo.findOneBy({id: user.id});

        if(!entityExists) throw new NotFoundException("User not found.");

        const infoForUpdate = {
            name: user.getName(),
            email: user.getEmail(),
            phone: user.getPhoneNumber(),
            address: user.getAddress()
        }

        await this.repo.update(user.id,infoForUpdate);

        const updatedUser = await this.repo.findOne({where:{id: user.id}, select:['name','email','phone','address']});
        
        if(!updatedUser) throw new NotFoundException("User not found after update.");

        return this.mapper.toUserPublicViewFromEntity(updatedUser);

    }

    /**
    * Performs a soft delete by marking the user as inactive.
    * Throws if the user does not exist.
    */
    async softDelete(id:string):Promise<void>{

        if(!id) throw new BadRequestException("Id is required.");
        
        const entityExists = await this.repo.findOneBy({id});
        
        if(!entityExists) throw new NotFoundException("User not found.");
        
        await this.repo.update(id,{status:false});
    }

    /**
    * Updates a user's password.
    * Validates input and ensures the user exists before applying the change.
    */
    async updatePassword(id:string, hashedPassword:string):Promise<void>{

        if(!id) throw new BadRequestException("Id is required.");

        if(!hashedPassword) throw new BadRequestException("Password is required.");
    
        const entityExists = await this.repo.findOneBy({id});

        if(!entityExists) throw new NotFoundException("User not found.");

        await this.repo.update(id,{password:hashedPassword});

    }

}