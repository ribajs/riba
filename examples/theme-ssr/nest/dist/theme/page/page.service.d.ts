export declare class PageService {
    list(): any[];
    get(slug: string): {
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
    };
}
