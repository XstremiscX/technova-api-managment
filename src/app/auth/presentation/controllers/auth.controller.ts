import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../dtos/login.dto";
import { LoginCommand } from "../../application/commands/login.command";
import { VerifyEmailCommand } from "../../application/commands/verify-email.command";

// Controller for handling authentication endpoints
@Controller("auth")
@ApiTags("auth")
export class AuthController{

    constructor(
        private readonly commandBus: CommandBus
    ){}

    // Endpoint that executes user login
    @ApiOperation({summary:"Login and JWT creation"})
    @ApiResponse({status:200, example:"{JWT:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c}"})
    @ApiResponse({status:404, example:"User not found"})
    @ApiResponse({status:401, example:"Unauthorized Credentials"})
    @Post()
    async logIn(@Body() loginDto: LoginDto){
        return this.commandBus.execute(new LoginCommand(loginDto.userEmail,loginDto.userPassword));
    }

    // Endpoint that performs user email verification
    @ApiOperation({summary:"Endpoint to verify an user email."})
    @ApiResponse({status:200, example:{verificationSucceded:true, message:"Email verification completed successfully"}})
    @ApiResponse({status:404, example:"User Not found."})
    @Get(':id')
    async verifyUserEmail(@Param('id') id:string){
        return this.commandBus.execute(new VerifyEmailCommand(id));
    }
}