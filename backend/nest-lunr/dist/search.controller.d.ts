import { Response } from 'express';
import { LunrService } from './lunr.service';
export declare class SearchController {
    readonly lunr: LunrService;
    constructor(lunr: LunrService);
    search(res: Response, namespace: string, query: string, limit?: number): Response<any, Record<string, any>>;
    searchAll(res: Response, query: string, limit?: number): Response<any, Record<string, any>>;
}
