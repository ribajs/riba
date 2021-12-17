export declare class LinkListService {
    list(): {
        main: {
            slug: string;
            items: {
                label: string;
                url: string;
            }[];
        };
    };
    get(slug: string): {
        slug: string;
        items: {
            label: string;
            url: string;
        }[];
    };
}
