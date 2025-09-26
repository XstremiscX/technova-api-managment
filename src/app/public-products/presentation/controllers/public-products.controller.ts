import { Controller, Query, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductItemResponseDto } from "src/app/commons/dtos/response-product-itme.dto";
import { FiltersDto } from "../dto/filters.dto";
import { QueryBus } from "@nestjs/cqrs";
import { FindAllPublicProductsQuery } from "../../application/queries/find-all-public-products.query";
import { ProductDetailResponseDto } from "src/app/commons/dtos/response-product-detail.dto";
import { FindByIdPublicProductQuery } from "../../application/queries/find-by-id-public-product.query";

@Controller('public-products')
@ApiTags('public-products')
export class PublicProductsController {

    constructor(
        private readonly queryBus:QueryBus
    ){}

    @ApiOperation({summary:"Get and list all products that match the filters, if any; if not, simply list all products."})
    @ApiResponse({status:200, type:ProductItemResponseDto})
    @ApiResponse({status:500, description:"Internal server error."})
    @Get()
    async findAllPublicProducts(@Query() filters:FiltersDto){
        
        return await this.queryBus.execute(new FindAllPublicProductsQuery(filters));

    }

    @ApiOperation({summary:"Get the details from the product."})
    @ApiResponse({status:200, type:ProductDetailResponseDto})
    @ApiResponse({status:500, description:"Internal server error."})
    @Get(':id')
    async findByIdPublicProducts(@Param('id') id: string){

        return await this.queryBus.execute(new FindByIdPublicProductQuery(id));
        
    }
}