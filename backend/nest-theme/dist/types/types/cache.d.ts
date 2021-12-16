export interface Cache {
    ttl: number;
    refresh?: {
        active?: boolean;
        startPath?: string;
    };
}
