import { DynamicModule, MiddlewareConsumer } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SsrMiddleware } from './ssr.middleware';
import type { NestThemeConfig } from './types';
export declare class ThemeModule {
    protected readonly adapterHost: HttpAdapterHost<ExpressAdapter>;
    protected config: ConfigService;
    protected ssrMiddleware: SsrMiddleware;
    constructor(adapterHost: HttpAdapterHost<ExpressAdapter>, config: ConfigService, ssrMiddleware: SsrMiddleware);
    static forRoot(nestThemeConfig: NestThemeConfig): DynamicModule;
    configure(consumer: MiddlewareConsumer): void;
}
