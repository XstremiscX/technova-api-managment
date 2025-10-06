import { Body, Controller, Post, Param, Get, Patch, Delete, Put, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../dtos/create-user.dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "../../application/commands/create-user.command";
import { GetByIdUserQuery } from "../../application/queries/get-by-id-user.query";
import { UserResponseDto } from "../dtos/response-user.dto";
import { DeleteUserCommand } from "../../application/commands/delete-user.command";
import { UpdateUserCommand } from "../../application/commands/update-user.command";
import { UpdateUserPasswordCommand } from "../../application/commands/update-password.command";
import { UpdatePasswordDto } from "../dtos/update-password.dto";
import { AuthGuard } from "src/app/auth/infrastructure/guards/auth.guard";
import { UpdateUserDto } from "../dtos/update-user.dto";

@Controller('users')
@ApiTags('users')
export class UserController{

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    // Endpoint to create a new user.
    @ApiOperation({summary:"Create a new user"})
    @ApiResponse({status:201, type:UserResponseDto})
    @ApiResponse({status:400, description:"Bad request"})
    @Post()
    async createUser(@Body() user:CreateUserDto){
        return  await this.commandBus.execute(new CreateUserCommand(user.name,user.email,user.phone,user.password,user.type,user.address));
    }

    // Endpoint to obtain user information by ID, with a valid JWT token.
    @ApiOperation({summary:"Get user by id"})
    @ApiResponse({status:200, type:UserResponseDto})
    @ApiResponse({status:400, description:"Bad request"})
    @ApiResponse({status:404, description:"User not found"})
    @Get(':id')
    @UseGuards(AuthGuard)
    async getUserById(@Param('id') id:string){
        return this.queryBus.execute(new GetByIdUserQuery(id));
    }
    
    // Endpoint to remove a user from the database.
    @ApiOperation({summary:"Soft delete user by id"})
    @ApiResponse({status:200, description:"User soft deleted successfully"})
    @ApiResponse({status:400, description:"Bad request"})
    @ApiResponse({status:404, description:"User not found"})
    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteUser(@Param('id') id:string){
        return this.commandBus.execute(new DeleteUserCommand(id));
    }

    // Endpoint to update user info.
    @ApiOperation({summary:"Update user by id"})
    @ApiResponse({status:200, type:UserResponseDto})
    @ApiResponse({status:400, description:"Bad request"})
    @ApiResponse({status:404, description:"User not found"})
    @Put(':id')
    @UseGuards(AuthGuard)
    async updateUser(@Param('id') id:string, @Body() user:UpdateUserDto){
        return this.commandBus.execute(new UpdateUserCommand(id,user.name,user.email,user.phone,user.address));
    }

    // Endpoint to update user password.
    @ApiOperation({summary:"User password update by id"})
    @ApiResponse({status:200, description:"User password updated successfully"})
    @ApiResponse({status:400, description:"Bad request"})
    @ApiResponse({status:404, description:"User not found"})
    @Patch(':id')
    @UseGuards(AuthGuard)
    async updateUserPassword(@Param('id') id:string, @Body() updateDto:UpdatePasswordDto ){
        return this.commandBus.execute(new UpdateUserPasswordCommand(id,updateDto.newPassword,updateDto.confirmPassword));
    }

}