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
      const message = exception.message || 'Unexpected error';
      return response.status(status).json({ statusCode: status, message });
    }

    const httpException = ErrorHandler.map(exception);
    return response.status(httpException.getStatus()).json({
      statusCode: httpException.getStatus(),
      message: httpException.message,
    });
  }
}