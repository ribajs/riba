import { Logger } from '@nestjs/common';
import { GlobalService } from '../global/global.service';
import { IndexService } from './index.service';
export declare class IndexController {
    protected global: GlobalService;
    protected index: IndexService;
    log: Logger;
    constructor(global: GlobalService, index: IndexService);
    root(): {
        meta: {
            title: string;
        };
        index: {
            title: string;
            content: string;
        };
        router: {
            namespace: string;
        };
        linkList: {
            main: {
                slug: string;
                items: {
                    label: string;
                    url: string;
                }[];
            };
        };
    };
}
