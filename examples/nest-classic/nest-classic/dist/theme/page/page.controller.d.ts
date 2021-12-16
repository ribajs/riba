import { GlobalService } from '../global/global.service';
import { PageService } from './page.service';
export declare class PageController {
    protected global: GlobalService;
    protected page: PageService;
    constructor(global: GlobalService, page: PageService);
    bySlug(slug: string): {
        meta: {
            title: string;
        };
        page: {
            slug: string;
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
