import { DynamicModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { NestThemeConfig } from './types';
export declare class ThemeModule {
    private config;
    constructor(config: ConfigService);
    static register(nestThemeConfig: NestThemeConfig, expressAdapter: ExpressAdapter, env?: string): Promise<DynamicModule>;
    configure(consumer: MiddlewareConsumer): void;
}
