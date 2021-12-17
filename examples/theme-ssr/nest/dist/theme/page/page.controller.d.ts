import { Logger } from '@nestjs/common';
import type { Response } from 'express';
import { GlobalService } from '../global/global.service';
import { PageService } from './page.service';
import { Ssr } from '../ssr.service';
export declare class PageController {
    protected global: GlobalService;
    protected page: PageService;
    protected ssr: Ssr;
    log: Logger;
    constructor(global: GlobalService, page: PageService, ssr: Ssr);
    index(res: Response): Promise<Response<any>>;
}
