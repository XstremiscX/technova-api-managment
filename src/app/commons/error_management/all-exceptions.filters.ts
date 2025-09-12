import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus,} from '@nestjs/common';
import { Response } from 'express';
import { ErrorHandler } from './error.handler';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Si el response es un objeto con message, lo usamos
      if (typeof exceptionResponse === 'object') {
        return response.status(status).json(exceptionResponse);
      }

      // Si no, usamos el mensaje genérico
      return response.status(status).json({
        statusCode: status,
        message: exception.message || 'Unexpected error',
      });
    }

    const httpException = ErrorHandler.map(exception);
    return response.status(httpException.getStatus()).json({
      statusCode: httpException.getStatus(),
      message: httpException.message,
    });
  }
}