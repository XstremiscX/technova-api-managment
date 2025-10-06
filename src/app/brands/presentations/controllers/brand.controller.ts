import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Get } from "@nestjs/common";
import { BrandResponseDto } from "../dtos/response-brand.dto";
import { GetAllBrandsQuery } from "../../application/queries/get-all-brands.query";
import { GetBrandByIdQuery } from "../../application/queries/get-by-id-brand.query";
import { CreateBrandDto } from "../dtos/create-brand.dto";
import { CreateBrandCommand } from "../../application/commands/create-brand.command";
import { UpdateBrandDto } from "../dtos/update-brand.dto";
import { UpdateBrandCommand } from "../../application/commands/update-brand.command";
import { DeleteBrandCommand } from "../../application/commands/delete-brand.command";
import { DeleteResponseDto } from "src/app/commons/dtos/response-deleted-domain.dto";
import { AuthGuard } from "src/app/auth/infrastructure/guards/auth.guard";
import { Roles } from "src/app/auth/infrastructure/decorators/roles.decorator";

// Controller that manages CRUD operations for brands using CQRS
@Controller("brands")
@ApiTags("brands")
export class BrandController {
    
    constructor(
        // Command bus to execute actions that modify the state
        private readonly commandBus: CommandBus,
        // Query bus to execute actions that read the status
        private readonly queryBus: QueryBus
    ){}

    // Endpoint to list all brands
    @Get()
    @ApiOperation({summary:"List all brands"})
    @ApiResponse({status:200, type:[BrandResponseDto]})
    async listAllBrands():Promise<BrandResponseDto[]>{
        return this.queryBus.execute(new GetAllBrandsQuery());
    }

    // Endpoint to get a brand by ID
    @Get(':id')
    @ApiOperation({summary:"Get brand by id"})
    @ApiResponse({status:200, type: BrandResponseDto})
    @ApiResponse({status:404, description:"Brand not found"})
    async getBrandById(@Param('id') id:string):Promise<BrandResponseDto>{
        return this.queryBus.execute(new GetBrandByIdQuery(id));
    }

    // Endpoint to create a new brand (ADMIN only)
    @Post()
    @ApiOperation({summary:"Create new Brand"})
    @ApiResponse({status:201, type: BrandResponseDto})
    @ApiResponse({status:400, description:"Business error"})
    @ApiResponse({status:500, description:"Internal server error."})
    @UseGuards(AuthGuard)
    @Roles('ADMIN')
    async createBrand(@Body() createBrandDto: CreateBrandDto){
        return this.commandBus.execute(new CreateBrandCommand(createBrandDto.name));
    }

    // Endpoint to update an existing brand (ADMIN only)
    @Put(':id')
    @ApiOperation({summary:"Update Brand"})
    @ApiResponse({status:200, type:BrandResponseDto})
    @ApiResponse({status:400, description:"Bad request"})
    @UseGuards(AuthGuard)
    @Roles('ADMIN')
    async updateBrand(@Param('id') id:string, @Body() updateBrandDto: UpdateBrandDto){
        return this.commandBus.execute(new UpdateBrandCommand(updateBrandDto.name,id));
    }

    // Endpoint to delete a brand (ADMIN only)
    @Delete(':id')
    @ApiOperation({summary:"Delete Brand"})
    @ApiResponse({status:200, type: DeleteResponseDto})
    @UseGuards(AuthGuard)
    @Roles('ADMIN')
    async deleteBrand(@Param('id') id:string){
        return this.commandBus.execute(new DeleteBrandCommand(id))
    }

}