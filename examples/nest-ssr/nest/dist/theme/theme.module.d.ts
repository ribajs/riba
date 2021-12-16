import { DynamicModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SsrMiddleware } from './ssr.middleware';
import { ThemeConfig } from '@ribajs/ssr';
export declare class ThemeModule {
    protected config: ConfigService;
    protected ssrMiddleware: SsrMiddleware;
    constructor(config: ConfigService, ssrMiddleware: SsrMiddleware);
    static forRoot(themeConfig: ThemeConfig): DynamicModule;
    configure(consumer: MiddlewareConsumer): void;
}
