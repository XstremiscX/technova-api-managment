import { CreateBrandDto } from "../../presentations/dtos/create-brand.dto";

export class CreateBrandCommand{

    // This command should receive an object of type CreateBrandDto.
    constructor(
        public readonly dto: CreateBrandDto
    ){}
}