import { Controller, Get, UseGuards, Req, Param, Post, Body } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/app/auth/infrastructure/decorators/roles.decorator";
import { AuthGuard } from "src/app/auth/infrastructure/guards/auth.guard";
import type { AuthenticatedRequest } from "src/app/commons/interfaces/Iauthenticated-request.interface";
import { FindAllSalesQuery } from "../../application/queries/find-all-sales.query";
import { SaleItemResponseDto } from "../dtos/response-sale-item.dto";
import { FindSaleDetailQuery } from "../../application/queries/find-sale-detail-query";
import { SaleDetailsResponseDto } from "../dtos/response-sale-details.dto";
import { CreateSaleDto } from "../dtos/create-sale.dto";
import { SaveSaleCommand } from "../../application/commands/save-sale.command";

// Controller for managing sales and purchases using CQRS and role-based access control
@Controller("sales")
@ApiTags("sales")
export class SaleController{

    constructor(
        private readonly commandBus:CommandBus,
        private readonly queryBus:QueryBus
    ){}
    
    // Endpoint to get all sales/purchases for the authenticated user
    @ApiOperation({summary:"Get all sales/purchases for a user."})
    @ApiResponse({status:200, type:[SaleItemResponseDto]})
    @ApiResponse({status:401, description:"Token is missing"})
    @ApiResponse({status:403, description:"Access denied: insufficient role"})
    @ApiResponse({status:500, example:"Internal server error."})
    @Get()
    @UseGuards(AuthGuard)
    @Roles('SELLER','BUYER')
    async findAllSales(@Req() req: AuthenticatedRequest){

        const userId = req.user.userId;
        const userType = req.user.userType;

        return await this.queryBus.execute(new FindAllSalesQuery(userId, userType));

    }

    // Endpoint to get detailed information about a specific sale/purchase by ID
    @ApiOperation({summary:"Get by id the sale/purchase for a user."})
    @ApiResponse({status:200, type:SaleDetailsResponseDto})
    @ApiResponse({status:401, description:"Token is missing"})
    @ApiResponse({status:403, description:"Access denied: insufficient role"})
    @ApiResponse({status:500, example:"Internal server error."})
    @Get(':id')
    @UseGuards(AuthGuard)
    @Roles('SELLER','BUYER')
    async findSaleDetail(@Param('id') id:string){

        return await this.queryBus.execute(new FindSaleDetailQuery(id));

    }

    // Endpoint to create a new sale/purchase
    @ApiOperation({summary:"Create a new sale"})
    @ApiResponse({status:200, type:SaleItemResponseDto})
    @ApiResponse({status:401, description:"Token is missing"})
    @ApiResponse({status:403, description:"Access denied: insufficient role"})
    @ApiResponse({status:500, example:"Internal server error."})
    @Post()
    @UseGuards(AuthGuard)
    @Roles('BUYER')
    async saveSale(@Body() createSaleDto:CreateSaleDto){

        return await this.queryBus.execute(new SaveSaleCommand(
            createSaleDto.amount,
            createSaleDto.quantity,
            createSaleDto.buyer,
            createSaleDto.seller,
            createSaleDto.details
        ));

    }

}