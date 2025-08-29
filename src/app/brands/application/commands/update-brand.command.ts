import { UpdateBrandDto } from "../../presentations/dtos/update-brand.dto";

export class UpdateBrandCommand{

    // This command should receive an object of type UpdateBrandDto.
    constructor(
        public readonly dto: UpdateBrandDto,
        public readonly id:string
    ){}
}