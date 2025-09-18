import { BadRequestException, Body, Controller, Param, UseFilters, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Get, Post, Delete, Patch, Put } from "@nestjs/common";
import { ApiResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetAllCategoriesQuery } from "../../application/queries/get-all-categories.query";
import { GetByIdCategoryQuery } from "../../application/queries/get-by-id-categories.query";
import { CreateCategoryCommand } from "../../application/commands/create-category.command";
import { DeleteCategoryCommand } from "../../application/commands/delete-category.command";
import { UpdateCategoryCommand } from "../../application/commands/update-category.command";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { UpdateCategoryDto } from "../dtos/update-category.dto";
import { CategoryResponseDto } from "../dtos/response-category.dto";
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";
import { AuthGuard } from "src/app/auth/infrastructure/guards/auth.guard";
import { Roles } from "src/app/auth/infrastructure/decorators/roles.decorator";


@Controller('categories')
@ApiTags('categories')
export class CategoryController {

    constructor(
        private queryBus : QueryBus,
        private commandBus : CommandBus
    ){}

    @Get()
    @ApiOperation({summary: "List all categories"})
    @ApiResponse({status:200, type:[CategoryResponseDto]})
    @ApiResponse({status: 500, description:"Internal Server Error."})
    async getAllCategories(): Promise<CategoryResponseDto[]>{
        return this.queryBus.execute(new GetAllCategoriesQuery());
    }

    @Get(':id')
    @ApiOperation({summary:"Get category by id"})
    @ApiResponse({status:200, type:CategoryResponseDto})
    @ApiResponse({status:404, description:"Category not found"})
    async getCategoryById(@Param('id') id: string){
        return this.queryBus.execute(new GetByIdCategoryQuery(id));
    }

    @Post()
    @ApiOperation({summary:"Create a new category"})
    @ApiResponse({status:201, type: CategoryResponseDto})
    @ApiResponse({status:400, type: BussinessError})
    @ApiResponse({status:500, description:"Internal Server Error."})
    @UseGuards(AuthGuard)
    @Roles('ADMIN')
    async createCategory(@Body() createCategoryDto: CreateCategoryDto){
        return this.commandBus.execute(new CreateCategoryCommand(createCategoryDto.name,createCategoryDto.description))
    }

    @Patch(':id')
    @ApiOperation({summary:"Update the category name."})
    @ApiResponse({status:201, type:CategoryResponseDto})
    @ApiResponse({status: 400, type: BussinessError})
    @ApiResponse({status:500, description:"Internal Server Error."})
    @UseGuards(AuthGuard)
    @Roles('ADMIN')
    async parcialUpdate(@Param('id') id:string, @Body() updateCategoryDto:UpdateCategoryDto){

        if(!updateCategoryDto.name) throw new BadRequestException("A category name is needed");
        if(updateCategoryDto.description) throw new BussinessError("For this endpoint don't charge a new description.")

        return this.commandBus.execute(new UpdateCategoryCommand(id, updateCategoryDto.name));
    }

    @Put(':id')
    @ApiOperation({summary:"Update category"})
    @ApiResponse({status:201, type:CategoryResponseDto})
    @ApiResponse({status: 400, type: BussinessError})
    @ApiResponse({status:500, description:"Internal Server Error."})
    @UseGuards(AuthGuard)
    @Roles('ADMIN')
    async updateCategory(@Param('id') id:string, @Body() updateCategoryDto:UpdateCategoryDto){

        if(!updateCategoryDto.name || !updateCategoryDto.description) throw new BadRequestException("A category name and description is needed.")

        return this.commandBus.execute(new UpdateCategoryCommand(id, updateCategoryDto.name,updateCategoryDto.description))
    }

    @Delete(':id')
    @ApiOperation({summary:"Delete category"})
    @ApiResponse({status:201, type:CategoryResponseDto})
    @ApiResponse({status: 400, type: BussinessError})
    @ApiResponse({status:500, description:"Internal Server Error."})
    @UseGuards(AuthGuard)
    @Roles('ADMIN')
    async deletCategory(@Param('id') id:string){
        return this.commandBus.execute(new DeleteCategoryCommand(id));
    }
}