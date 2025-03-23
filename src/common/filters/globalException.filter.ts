
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

    catch(exception: unknown, host: ArgumentsHost): void {
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
                const response = exception instanceof HttpException ? exception.getResponse() : exception.message;
                responseBody["message"] = response && typeof response === "object" && "message" in response
                    ? response.message
                    : response;

                responseBody["stack"] = exception.stack || "No stack available";
            }
        }
        else {
            const response = exception instanceof HttpException ? exception.getResponse() : HTTP_ERROR_MSG.UNCATEGORIZED;
            responseBody["message"] = response && typeof response === "object" && "message" in response
                ? response.message
                : response;
        }
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
