import { HttpService } from '@ribajs/core';
import { ITheme } from '../interfaces/shopify-api/theme';
import { BaseApiService } from './base.service';

export class ShopifyApiBlogsService extends BaseApiService {
  public static instance?: ShopifyApiBlogsService;

  protected baseUrl: string;

  protected constructor(host?: string) {
    super(host);
    this.baseUrl = this.host + "/shopify/api/blogs";
  }

  public static getSingleton(host?: string) {
    if (ShopifyApiBlogsService.instance) {
      return ShopifyApiBlogsService.instance;
    }
    ShopifyApiBlogsService.instance = new ShopifyApiBlogsService(host);
    return ShopifyApiBlogsService.instance;
  }

  /**
   * List blogs
   */
  public async list() {
    const blogs = await HttpService.getJSON<ITheme[]>(`${this.baseUrl}`);
    console.debug('[ShopifyApiBlogsService] blogs', blogs);
    return blogs;
  }
}
