import { LinkListService } from '../link-list/link-list.service';
export declare class GlobalService {
    protected linkList: LinkListService;
    constructor(linkList: LinkListService);
    get(): {
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
