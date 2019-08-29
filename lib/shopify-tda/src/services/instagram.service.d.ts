export interface IInstagramMediaData {
    media_url: string;
    media_type: 'VIDEO' | 'IMAGE' | 'CAROUSEL_ALBUM';
    caption: string;
    id: string;
    comments_count: number;
    is_comment_enabled: boolean;
    like_count: number;
    permalink: string;
    timestamp: string;
}
export interface IInstagramMediaPaging {
    cursors: {
        after: string;
        before: string;
    };
}
export interface IInstagramMedia {
    data: IInstagramMediaData[];
    paging: IInstagramMediaPaging;
}
export interface IInstagramResponse {
    media: IInstagramMedia;
    id: string;
}
export declare class InstagramService {
    static baseUrl: string;
    static loadMedia(instagramId: string, limit?: number): Promise<any>;
}
