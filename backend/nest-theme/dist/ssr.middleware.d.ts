import { NestMiddleware, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FullThemeConfig } from './types/theme-config';
import { SsrService } from './ssr.service';
import type { Request, Response, NextFunction } from 'express';
export declare class SsrMiddleware implements NestMiddleware {
    protected config: ConfigService;
    protected ssr: SsrService;
    theme: FullThemeConfig;
    log: Logger;
    constructor(config: ConfigService, ssr: SsrService);
    use(req: Request, res: Response, next: NextFunction): Promise<void | Response<any>>;
    protected getRouteSettingsByRoute(routePath: string): import("@ribajs/ssr").Route;
}
