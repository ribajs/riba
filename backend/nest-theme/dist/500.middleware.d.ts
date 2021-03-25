import { NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
export declare class SsrMiddleware implements NestMiddleware {
    use(error: Error, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
