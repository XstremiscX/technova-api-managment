import { BadRequestException, HttpCode, HttpException, HttpStatus, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BussinessError } from "./bussines errors/bussines-error";

export class ErrorHandler{

    static map(error:unknown):HttpException{

        if(error instanceof BussinessError){

            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }else if(error instanceof BadRequestException){

            return new HttpException(error.message, HttpStatus.BAD_REQUEST);

        }else if(error instanceof UnauthorizedException){

            return new HttpException(error.message, HttpStatus.UNAUTHORIZED);

        }else if(error instanceof NotFoundException){

            return new HttpException(error.message, HttpStatus.NOT_FOUND);

        }else if(error instanceof HttpException){

            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);

        }else if(error instanceof Error){

            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);

        }else {

            return new HttpException("Internal Server Error.", HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

}