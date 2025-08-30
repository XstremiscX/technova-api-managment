import { UpdateBrandCommand } from "../application/commands/update-brand.command";
import { Brand } from "../domain/entities/brand";
import { CreateBrandDto } from "../presentations/dtos/create-brand.dto";
import {v4 as uuid} from 'uuid';
import { BadRequestException } from "@nestjs/common";
import { verify } from "crypto";

export class BrandFactory {

    // This method verifies that a string is not filled with line breaks or empty spaces. 
    private static verifyVoid(data:string):string{

        if(data.trim() === ""){

            // If the data is void, throw a BadRequestException.
            throw new BadRequestException("The brand name must be distinct from void")

        }else{
        
            // If the data isn't void, return data.
            return data;

        }

    }

    // This method creates a brand from a CreateBrandDto.
    static createFromDto(dto:CreateBrandDto):Brand{

        // Convert the name to uppercase.
        const name = dto.name.trim().toUpperCase();

        // Returns a new Brand 
        return new Brand(uuid(), this.verifyVoid(name));

    }

    // This method updates a brand based on the information in UpdateBrandCommand.
    static updateFromCommand(command: UpdateBrandCommand){

        if(command.dto.name){   

            // If the name contains information, it is converted to uppercase letters.
            const name = command.dto.name?.trim().toUpperCase();

            // Returns a new Brand
            return new Brand(command.id, this.verifyVoid(name));

        }else{

            // Throws a BadRequestException if the name is void or null.
            throw new BadRequestException("The brand name must be distinct from null or undefined.")

        }

    }
}