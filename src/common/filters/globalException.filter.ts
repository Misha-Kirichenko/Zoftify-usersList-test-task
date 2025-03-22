
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { HTTP_ERROR_MSG } from '../constants';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: any, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const responseBody = {};

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.BAD_REQUEST;

        responseBody["statusCode"] = httpStatus;
        if (process.env.NODE_ENV === "development") {
            responseBody["timestamp"] = Date.now();
            responseBody["path"] = httpAdapter.getRequestUrl(ctx.getRequest());
            if (exception instanceof Error) {
                responseBody["message"] = exception.message;
                responseBody["stack"] = exception.stack || "No stack available";
            }
        }
        else {
            responseBody["message"] = exception instanceof HttpException ? exception.message : HTTP_ERROR_MSG.UNCATEGORIZED;
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
