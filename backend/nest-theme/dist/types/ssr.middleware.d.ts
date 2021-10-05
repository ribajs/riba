import { NestMiddleware, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FullThemeConfig } from './types/theme-config';
import { SsrService } from './ssr.service';
import type { Request, Response, NextFunction } from 'express';
import type { Cache } from 'cache-manager';
import { Key } from 'path-to-regexp';
import { Route } from '@ribajs/ssr';
export declare class SsrMiddleware implements NestMiddleware {
    protected readonly config: ConfigService;
    protected readonly ssr: SsrService;
    protected cacheManager: Cache;
    theme: FullThemeConfig;
    log: Logger;
    constructor(config: ConfigService, ssr: SsrService, cacheManager: Cache);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    protected getRouteSettingsByUrl(url: URL): {
        settings: Route;
        query: import("qs").ParsedQs;
        params: any;
        path: string;
        keys: Key[];
    };
    protected getRouteSettingsByRoute(routePath: string): Route;
}