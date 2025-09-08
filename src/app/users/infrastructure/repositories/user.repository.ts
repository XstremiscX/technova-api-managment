import { Repository } from "typeorm";
import { IUserRepository } from "../../domain/interfaces/iuser-repository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserResponseDto } from "../../presentations/dtos/response-user.dto";
import { User } from "../../domain/entities/user";
import { PartialType } from "@nestjs/mapped-types";
import { DeletedResult } from "src/app/commons/utils/enums/deleted-resutls.enum";
import { UserMapper } from "../../presentations/mappers/user.mapper";

@Injectable()
export class UserRepository implements IUserRepository{

    constructor(
        @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
        private mapper : UserMapper
    ) {}

    
    async findById(id: string):Promise<UserResponseDto>{
        
        if(!id) throw new BadRequestException("Id is requeired.");

        const entity = await this.repo.findOne({where:{id}, select:['name','email','phone','address','type']});

        if(!entity) throw new NotFoundException("User not found.");

        return this.mapper.toResponseDtoFromEntity(entity);
    }

    async save(user: User): Promise<UserResponseDto> {
        
        const savedUser = await this.repo.save(user);

        return this.mapper.toResponseDtoFromDomain(savedUser);
        
    }

    async update(user:User): Promise<UserResponseDto>{

        const entityExists = await this.repo.findOneBy({id:user.id})

        if(!entityExists) throw new NotFoundException("User not found.");

        const updatedUser = await this.repo.save(user);

        return this.mapper.toResponseDtoFromDomain(updatedUser);

    }

    async delete(id:string):Promise<void>{
        if(!id) throw new BadRequestException("Id is required.");
        
        const entityExists = await this.repo.findOneBy({id});
        
        if(!entityExists) throw new NotFoundException("User not found.");
        
        await this.repo.remove(entityExists);
    }

}