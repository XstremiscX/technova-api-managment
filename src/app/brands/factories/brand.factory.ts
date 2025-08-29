import { Brand } from "../domain/entities/brand";
import { CreateBrandDto } from "../presentations/dtos/create-brand.dto";
import {v4 as uuid} from 'uuid';

export class BrandFactory {
    static createFromDto(dto:CreateBrandDto):Brand{

        // Business Rule: Capitalize the name
        const name = dto.name.trim().toUpperCase();

        return new Brand(uuid(), name);

    }
}