import { ExceptionFilter, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SsrService } from '../ssr.service';
import type { FullThemeConfig } from '../types/theme-config';
import { Response } from 'express';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private config;
    private ssr;
    theme: FullThemeConfig;
    log: Logger;
    constructor(config: ConfigService, ssr: SsrService);
    private getErrorObject;
    private renderErrorPage;
    catch(exception: HttpException, host: ArgumentsHost): Promise<Response<any, Record<string, any>>>;
}
export declare const HttpExceptionFilterProvider: {
    provide: string;
    useClass: typeof HttpExceptionFilter;
};
