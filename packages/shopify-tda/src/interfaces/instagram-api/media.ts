import type { InstagramPaging } from './paging';

export interface InstagramMediaData {
  media_url: string;
  media_type: "VIDEO" | "IMAGE" | "CAROUSEL_ALBUM";
  caption: string;
  id: string;
  comments_count: number;
  is_comment_enabled: boolean;
  like_count: number;
  permalink: string;
  timestamp: string;
}

export interface InstagramMedia {
  media: InstagramMediaData[];
  paging: InstagramPaging;
}
