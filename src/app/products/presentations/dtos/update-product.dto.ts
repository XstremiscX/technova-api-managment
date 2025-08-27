import { CreateProductDto } from "./create-product.dto";
import { OmitType } from "@nestjs/swagger";

export class UpdateProductDto extends OmitType(CreateProductDto,["seller_id"]){


}