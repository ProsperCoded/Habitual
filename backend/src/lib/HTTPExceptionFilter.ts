import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ServerResponse } from 'src/lib/types';
function logger(loggerObject: any) {
  console.log('----------------------------------------------');
  console.log('Error');
  console.error(loggerObject);
  console.log('----------------------------------------------');
}
@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    // exception.cause
    const responseObject: ServerResponse<null> = {
      message,
      data: null,
      error: JSON.stringify(exception.stack),
    };
    const loggerObject = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    };
    logger(loggerObject);
    response.status(status).json(responseObject);
  }
}
