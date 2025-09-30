import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/app/auth/infrastructure/decorators/roles.decorator";
import { AuthGuard } from "src/app/auth/infrastructure/guards/auth.guard";
import { FindAllProductsQuery } from "../../application/queries/find-all-products.query";
import { ProductItemResponseDto } from "../../../commons/dtos/response-product-itme.dto";
import type { AuthenticatedRequest } from "../../../commons/interfaces/Iauthenticated-request.interface";
import { FindByIdProductQuery } from "../../application/queries/find-by-id-product.query";
import { ProductDetailResponseDto } from "../../../commons/dtos/response-product-detail.dto";
import { CreateProductDto } from "../dtos/create-product.dto";
import { CreateProductCommand } from "../../application/commands/create-product.command";
import { DeleteResponseDto } from "src/app/commons/utils/response-deleted-domain.dto";
import { DeleteProductCommand } from "../../application/commands/delete-product.command";
import { UpdateProductCommand } from "../../application/commands/update-product.command";
import { UpdateProductDto } from "../dtos/update-product.dto";

@Controller('seller-products')
@ApiTags('seller-products')
export class SellerProductsController {

    constructor(
        private readonly commandBus : CommandBus,
        private readonly queryBus : QueryBus 
    ){}

    @ApiOperation({summary:"Find all products belonging to the seller."})
    @ApiResponse({status:200, type:ProductItemResponseDto})
    @ApiResponse({status:401, description:"Token is missing"})
    @ApiResponse({status:403, description:"Access denied: insufficient role"})
    @Get()
    @Roles("SELLER")
    @UseGuards(AuthGuard)
    async findAll(@Req() req: AuthenticatedRequest){

        const sellerId = req.user.userId;

        return await this.queryBus.execute(new FindAllProductsQuery(sellerId));
        
    }

    @ApiOperation({summary:"Find details about the selected product"})
    @ApiResponse({status:200, type:ProductDetailResponseDto})
    @ApiResponse({status:401, description:"Token is missing"})
    @ApiResponse({status:403, description:"Access denied: insufficient role"})
    @ApiResponse({status:404, description:"Product not found."})
    @Get(':id')
    @Roles('SELLER')
    @UseGuards(AuthGuard)
    async findById(@Param('id') id:string){
        
        return await this.queryBus.execute(new FindByIdProductQuery(id));
         
    }

    @ApiOperation({summary:"Create a new product"})
    @ApiResponse({status:201, type:ProductItemResponseDto})
    @ApiResponse({status:401, description:"Token is missing"})
    @ApiResponse({status:403, description:"Access denied: insufficient role"})
    @ApiResponse({status:404, description:"Product not found."})
    @Post()
    @UseGuards(AuthGuard)
    @Roles('SELLER')
    async createProduct(@Body() createProductDto:CreateProductDto){

        return await this.commandBus.execute(new CreateProductCommand(
            createProductDto.name,
            createProductDto.image,
            createProductDto.description,
            createProductDto.price,
            createProductDto.stock,
            createProductDto.details,
            createProductDto.brand,
            createProductDto.category,
            createProductDto.seller_id
        ));

    }

    @ApiOperation({summary:"Soft delete of the product"})
    @ApiResponse({status:200, type:DeleteResponseDto})
    @ApiResponse({status:401, description:"Token is missing"})
    @ApiResponse({status:403, description:"Access denied: insufficient role"})
    @ApiResponse({status:404, description:"Product not found."})
    @Delete(':id')
    @UseGuards(AuthGuard)
    @Roles('SELLER')
    async softDelete(@Param('id') id:string, @Req() req:AuthenticatedRequest){
        
        const sellerId = req.user.userId;
        return await this.commandBus.execute(new DeleteProductCommand(id,sellerId));

    }

    @ApiOperation({summary:"Updates the product data."})
    @ApiResponse({status:200, type:ProductItemResponseDto})
    @ApiResponse({status:401, description:"Token is missing"})
    @ApiResponse({status:403, description:"Access denied: insufficient role"})
    @ApiResponse({status:404, description:"Product not found."})
    @Put(':id')
    @UseGuards(AuthGuard)
    @Roles('SELLER')
    async updateProduct(@Param('id') id:string, @Req() req:AuthenticatedRequest, @Body() updateProductDto: UpdateProductDto){
        
        const sellerId = req.user.userId;
        
        return await this.commandBus.execute(new UpdateProductCommand(
            id,
            sellerId,
            updateProductDto
        ));

    }

}