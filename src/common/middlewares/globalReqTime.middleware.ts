
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getReqTime } from '../utils';

@Injectable()
export class GlobalReqTimeLoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl: url } = req;
        const start = new Date();
        console.log(`🟢 [${start.toISOString()}]: ${method} ${url} start`);
        res.on('finish', () => {
            const end = new Date();
            const timeDiff = getReqTime(start.getTime(), end.getTime());
            console.log(`🔴 [${end.toISOString()}]: ${method} ${url} finish`);
            console.log("⏰ Request processing time ➡️ ", timeDiff);
        });
        next();
    }
}
