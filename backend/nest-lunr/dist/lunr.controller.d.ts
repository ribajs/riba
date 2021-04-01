import { Response } from 'express';
import { LunrService } from './lunr.service';
export declare class LunrController {
    readonly lunr: LunrService;
    constructor(lunr: LunrService);
    search(res: Response, namespace: string, query: string): Response<any, Record<string, any>>;
}
