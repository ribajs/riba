import { NestMiddleware, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FullThemeConfig } from './types/theme-config';
import { SsrService } from './ssr.service';
import type { Request, Response, NextFunction } from 'express';
import type { Cache } from 'cache-manager';
export declare class SsrMiddleware implements NestMiddleware {
    readonly config: ConfigService;
    private readonly ssr;
    private cacheManager;
    theme: FullThemeConfig;
    log: Logger;
    constructor(config: ConfigService, ssr: SsrService, cacheManager: Cache);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    private getRouteSettingsByRoute;
}
