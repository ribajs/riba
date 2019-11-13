import { HttpService } from '@ribajs/core';
import { BaseService } from './base.service';

export interface InstagramMediaData {
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

export interface InstagramMediaPaging {
  cursors: {
    after: string;
    before: string;
  };
}

export interface InstagramMedia {
  data: InstagramMediaData[];
  paging: InstagramMediaPaging;
}

export interface InstagramResponse {
  media: InstagramMedia;
  id: string;
}

export class InstagramService {

  public static baseUrl = BaseService.baseUrl + '/instagram/api';

  public static async loadMedia(instagramId: string, limit = 0) {
    const url = `${this.baseUrl}/media/${instagramId}`;
    const data: any = {
      fields: `caption,comments_count,is_comment_enabled,like_count,media_type,media_url,permalink,timestamp,children{media_type,media_url}`,
      limit,
    };
    if ((window as any).Shopify.shop) {
      data.shop = (window as any).Shopify.shop;
    }

    return HttpService.getJSON(url, data);
  }

}
