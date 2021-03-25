import { ExceptionFilter, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { ErrorObj } from '@ribajs/ssr';
import { ConfigService } from '@nestjs/config';
import { SsrService } from '../ssr.service';
import type { FullThemeConfig } from '../types/theme-config';
import { Request, Response } from 'express';
export declare class HttpExceptionFilter implements ExceptionFilter {
    protected config: ConfigService;
    protected ssr: SsrService;
    theme: FullThemeConfig;
    log: Logger;
    constructor(config: ConfigService, ssr: SsrService);
    protected getErrorObject(exception: HttpException | Error, req: Request): ErrorObj;
    catch(exception: HttpException, host: ArgumentsHost): Promise<Response<any, Record<string, any>>>;
}
export declare const HttpExceptionFilterProvider: {
    provide: string;
    useClass: typeof HttpExceptionFilter;
};
