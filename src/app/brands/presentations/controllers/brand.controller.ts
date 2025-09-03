import { Body, Controller, Delete, Param, Post, Put, Req } from "@nestjs/common";
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
import { DeleteBrandResponseDto } from "../dtos/response-delete-brand.dto";

@Controller("brand")
@ApiTags("brand")
export class BrandController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}

    @Get()
    @ApiOperation({summary:"List all brands"})
    @ApiResponse({status:200, type:[BrandResponseDto]})
    @ApiResponse({status:404, description:"Brands not found"})
    async listAllBrands():Promise<BrandResponseDto[]>{
        return this.queryBus.execute(new GetAllBrandsQuery());
    }

    @Get(':id')
    @ApiOperation({summary:"Get brand by id"})
    @ApiResponse({status:200, type: BrandResponseDto})
    @ApiResponse({status:404, description:"Brand not found"})
    async getBrandById(@Param('id') id:string):Promise<BrandResponseDto>{
        return this.queryBus.execute(new GetBrandByIdQuery(id));
    }

    @Post()
    @ApiOperation({summary:"Create new Brand"})
    @ApiResponse({status:201, type: BrandResponseDto})
    @ApiResponse({status:500, description:"Internal server error."})
    async createBrand(@Body() createBrandDto: CreateBrandDto){
        return this.commandBus.execute(new CreateBrandCommand(createBrandDto.name));
    }

    @Put(':id')
    @ApiOperation({summary:"Update Brand"})
    @ApiResponse({status:200, type:BrandResponseDto})
    @ApiResponse({status:400, description:"Bad request"})
    async updateBrand(@Param('id') id:string, @Body() updateBrandDto: UpdateBrandDto){
        return this.commandBus.execute(new UpdateBrandCommand(updateBrandDto.name,id));
    }

    @Delete(':id')
    @ApiOperation({summary:"Delete Brand"})
    @ApiResponse({status:200, type: DeleteBrandResponseDto})
    async deleteBrand(@Param('id') id:string){
        return this.commandBus.execute(new DeleteBrandCommand(id))
    }

}