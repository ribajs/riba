import { Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FullThemeConfig } from '../types/theme-config';
export declare class RefreshCacheService implements OnApplicationBootstrap {
    protected readonly config: ConfigService;
    protected theme: FullThemeConfig;
    protected visited: string[];
    protected log: Logger;
    constructor(config: ConfigService);
    onApplicationBootstrap(): Promise<void>;
    protected isInternalLink(link: string, host: string): boolean;
    protected normalize(link: string, host: string): string;
    protected alreadyVisited(link: string): boolean;
    protected followLink(link: string, host: string): boolean;
    protected parseLinks(html: string): string[];
    protected deepRefresh(links: string[], host: string): Promise<void>;
    refresh(host?: string, force?: boolean): Promise<void>;
}
