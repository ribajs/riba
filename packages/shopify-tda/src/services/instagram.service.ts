import { Utils, Debug } from '@ribajs/core';
import { TheDeveloperAppService } from './the-developer-app.service';

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

// TODO move to the-developer-app modul
export class InstagramService {

  public static baseUrl = TheDeveloperAppService.baseUrl + '/instagram/api';

  public static async loadMedia(instagramId: string, limit = 0) {
    const url = `${this.baseUrl}/media/${instagramId}`;
    const data: any = {
      fields: `caption,comments_count,is_comment_enabled,like_count,media_type,media_url,permalink,timestamp,children{media_type,media_url}`,
      limit,
    };
    if ((window as any).Shopify.shop) {
      data.shop = (window as any).Shopify.shop;
    }

    return Utils.getJSON(url, data);
  }

}
