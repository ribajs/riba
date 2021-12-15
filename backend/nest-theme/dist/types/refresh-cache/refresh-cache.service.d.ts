import { OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class RefreshCacheService implements OnApplicationBootstrap {
    private readonly config;
    private theme;
    private visited;
    private log;
    static isRunning: boolean;
    constructor(config: ConfigService);
    onApplicationBootstrap(): Promise<void>;
    private isInternalLink;
    private normalize;
    private alreadyVisited;
    private followLink;
    private parseLinks;
    private deepRefresh;
    refresh(host?: string, force?: boolean): Promise<void>;
}
